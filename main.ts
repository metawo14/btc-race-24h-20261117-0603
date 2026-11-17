import { runBars } from './vendor/makefun-bars.ts';
import type { BarsState, Batch, OrderInput } from './vendor/makefun-bars.ts';

const SYMBOL = 'CBBTC';
const BPS = 10_000n;
const STOP_BPS = 74n;
const REENTRY_BPS = 30n;
const SLIPPAGE_BPS = 200;

const SCORED_BARS = 1440n;
const BAR_MS = 60_000n;

let peak: bigint = 0n;
let trough: bigint = 0n;
let started: boolean = false;
let lastCloseAt: bigint = 0n;
let haveLastClose: boolean = false;

function heldQty(state: BarsState): bigint {
  return state.positions.get(SYMBOL)?.qty ?? 0n;
}

function isFinalBatch(state: BarsState, batch: Batch): boolean {
  if (!haveLastClose) {
    lastCloseAt = BigInt(state.hello.first_close_ms) + (BigInt(state.warmupBars) + SCORED_BARS - 1n) * BAR_MS;
    haveLastClose = true;
  }
  return BigInt(batch.t) >= lastCloseAt;
}

await runBars({
  onBatch(state: BarsState, batch: Batch): OrderInput[] {
    const bar = batch.bars.find((b) => b.symbol === SYMBOL);
    if (bar === undefined) return [];
    if (state.warmingUp) return [];
    if (isFinalBatch(state, batch)) return [];

    const close = BigInt(bar.c);
    const qty = heldQty(state);

    if (qty > 0n) {
      if (peak === 0n) peak = close;
      else if (close > peak) peak = close;
      trough = 0n;
      if (close * BPS < peak * (BPS - STOP_BPS)) {
        return [{ side: 'sell', symbol: SYMBOL, qty, max_slippage_bps: SLIPPAGE_BPS }];
      }
      started = true;
      return [];
    }

    peak = 0n;
    if (trough === 0n) trough = close;
    else if (close < trough) trough = close;

    if (!started) {
      started = true;
      if (state.cash <= 0n) return [];
      return [{ side: 'buy', symbol: SYMBOL, notional_quote_units: state.cash, max_slippage_bps: SLIPPAGE_BPS }];
    }

    if (close * BPS > trough * (BPS + REENTRY_BPS) && state.cash > 0n) {
      return [{ side: 'buy', symbol: SYMBOL, notional_quote_units: state.cash, max_slippage_bps: SLIPPAGE_BPS }];
    }
    return [];
  },
});
