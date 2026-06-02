# TradeLog — Ideas Log

## 2026-06-01 — Shipped
- **Keyboard shortcuts** (`1`–`4` navigate Dashboard/Trades/Journal/Strategy; `Ctrl+Enter` saves journal note in modal; `Escape` already worked)
- **Sidebar tooltip hints** — tooltips now show `[1]`–`[4]` to surface the shortcuts to new users
- **Fix "Max Drawdown" stat** — was incorrectly showing worst *single trade* P&L; now shows true peak-to-trough equity drawdown; the old worst-single-trade value is relabelled "Worst Trade"
- **Expectancy stat card** on Dashboard — shows average $/trade (total P&L ÷ trade count), the simplest edge metric a trader needs to see
- **R-multiple sub-line in P&L cell** — when a SL price is set, each row now shows e.g. `+1.5R` in muted text below the dollar P&L, so traders can evaluate trades in risk-adjusted terms without leaving the table

## 2026-06-01 (batch 2) — Shipped
- **Export filtered trades to CSV** — "Export CSV" button on the Trades view downloads the *currently filtered + sorted* set, including computed %Risk and realised R-multiple, so traders can pivot/analyse in Excel/Sheets. Pure client-side Blob download, no IPC, no network.
- **Filter + sort persistence** — last-used search/side/result/date filters and sort column survive app restarts via `localStorage` (key `tradelog.tradeFilters`). Separate from the JSON trade/notes store, so no risk to saved data.
- **Stat-card tooltips** — hover any Dashboard or Strategy stat card for a plain-English explanation (Expectancy, Profit Factor, Target Hit vs Win Rate, Max Drawdown, R, etc.). Helps newer traders read their own numbers.
- **Hold Time in trade modal** — shows entry→exit duration (e.g. `2h 10m`, `3d 4h`) so traders can distinguish scalps from swings at a glance.

## Deferred ideas for future runs
- **Export trades to CSV** — "Export CSV" button on Trades view that downloads the current filtered set; useful for further analysis in Excel/Google Sheets
- **Filter state persistence** — remember last-used filter values in memory (or localStorage) so returning to a view doesn't reset symbol/side/date filters
- **R-multiple column in Strategy table** is already there; add same Avg R summary to journal entry header cards
- **Trade duration column in the table** — Hold Time now shows in the modal; consider an optional sortable column in the Trades table too (would widen the table — needs a responsive look first)
- **Avg hold-time stat** — surface average winner vs loser hold time on the Dashboard (do losers get held too long?)
- **Journal entry Avg R header** — add R-multiple to each journal card header (mirrors the Trades table sub-line)
- **Export Strategy setups to CSV** — same Export pattern for the Cup & Handle events table
- **Remember last-active view** — persist which view (Dashboard/Trades/…) you were on across restarts, like the trade filters now do
