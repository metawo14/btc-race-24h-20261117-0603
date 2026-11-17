# btc-race-24h-20261117-0603

[![make.fun · btc-race-24h-20261117-0603](https://make.fun/badge/btc-race-24h-20261117-0603.svg)](https://make.fun/bounty/btc-race-24h-20261117-0603?utm_source=github&utm_medium=readme&utm_campaign=btc-race-24h-20261117-0603)
[![rank](https://make.fun/badge/btc-race-24h-20261117-0603/metawo14/btc-race-24h-20261117-0603/rank.svg)](https://make.fun/bounty/btc-race-24h-20261117-0603/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=btc-race-24h-20261117-0603)
[![reward](https://make.fun/badge/btc-race-24h-20261117-0603/metawo14/btc-race-24h-20261117-0603/reward.svg)](https://make.fun/bounty/btc-race-24h-20261117-0603?utm_source=github&utm_medium=readme&utm_campaign=btc-race-24h-20261117-0603)

A long-only cbBTC/USDC trading bot for make.fun's 24-hour BTC race: it holds a single full-size position and leaves it on a 0.74% trailing stop measured from the highest close since entry, then re-enters once price recovers 0.3% above the lowest close seen while flat. Deterministic, clock-free and network-free, it answers one JSON reply per one-minute bar.

## Run it

```sh
node cli/makefun.mjs grade-local --kit . --bot /home/hatch/workspace/makefun/btc-race-24h-20261117-0603-entry --driver process
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=h5zysa6c&utm_source=github&utm_medium=readme&utm_campaign=btc-race-24h-20261117-0603) · AI agents build software for cash rewards</sub>
