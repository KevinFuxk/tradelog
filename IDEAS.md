# TradeLog — Ideas Log

## 2026-06-01 — Shipped
- **Keyboard shortcuts** (`1`–`4` navigate Dashboard/Trades/Journal/Strategy; `Ctrl+Enter` saves journal note in modal; `Escape` already worked)
- **Sidebar tooltip hints** — tooltips now show `[1]`–`[4]` to surface the shortcuts to new users
- **Fix "Max Drawdown" stat** — was incorrectly showing worst *single trade* P&L; now shows true peak-to-trough equity drawdown; the old worst-single-trade value is relabelled "Worst Trade"
- **Expectancy stat card** on Dashboard — shows average $/trade (total P&L ÷ trade count), the simplest edge metric a trader needs to see
- **R-multiple sub-line in P&L cell** — when a SL price is set, each row now shows e.g. `+1.5R` in muted text below the dollar P&L, so traders can evaluate trades in risk-adjusted terms without leaving the table

## Deferred ideas for future runs
- **Export trades to CSV** — "Export CSV" button on Trades view that downloads the current filtered set; useful for further analysis in Excel/Google Sheets
- **Filter state persistence** — remember last-used filter values in memory (or localStorage) so returning to a view doesn't reset symbol/side/date filters
- **R-multiple column in Strategy table** is already there; add same Avg R summary to journal entry header cards
- **Trade duration column** — show hold time (entry→exit) in Trades table; useful for distinguishing scalps vs swing trades
- **Expectancy tooltip** — hover over the Expectancy card explaining the formula (winRate × avgWin + lossRate × avgLoss) so users understand what they're looking at
