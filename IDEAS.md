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

## 2026-06-02 — Shipped
- **Export Strategy setups to CSV** — "Export CSV" button on the Cup & Handle view downloads the *currently filtered* setups (date, symbol, TF, entry/stop/target, result R, MFE/MAE, outcome, size/return/earnings buckets, handle). Mirrors the Trades export; pure client-side Blob, no IPC/network.
- **Avg Hold stat on Dashboard** — new card shows average hold time of winners (value) vs losers (sub-line) so traders can spot "letting losers run". Reuses `holdMs`/`fmtDur`; only appears when timestamps exist.
- **Journal note full-text search** — search box in the Journal filter bar matches the text of any note section (and symbol), so traders can find e.g. "FOMC" or "revenge" entries instantly. Added `noteText()` helper; folded into existing filter chain + Clear.
- **Remember last-active view** — the app reopens on whichever main view (Dashboard/Trades/Journal/Strategy) you used last, via `localStorage` (`tradelog.lastView`). Import flow deliberately excluded. No JSON-store change.

## Deferred ideas for future runs
- **Export trades to CSV** — DONE 2026-06-01 (batch 2); kept for history
- **Filter state persistence** — DONE 2026-06-01 (batch 2); kept for history
- **Filter state persistence** — remember last-used filter values in memory (or localStorage) so returning to a view doesn't reset symbol/side/date filters
- **R-multiple column in Strategy table** is already there; add same Avg R summary to journal entry header cards
- **Trade duration column in the table** — Hold Time now shows in the modal; consider an optional sortable column in the Trades table too (would widen the table — needs a responsive look first)
- **Avg hold-time stat** — surface average winner vs loser hold time on the Dashboard (do losers get held too long?)
- **Journal entry Avg R header** — add R-multiple to each journal card header (mirrors the Trades table sub-line)
- **Export Strategy setups to CSV** — same Export pattern for the Cup & Handle events table
- **Remember last-active view** — DONE 2026-06-02; kept for history
- **Persist Strategy (Cup & Handle) filters** — mirror the Trades filter persistence for the strategy view's symbol/TF/size/outcome/date filters
- **Avg R on Dashboard** — show average realised R per trade (for trades that have a SL), alongside the $ Expectancy card
- **Best/worst day stat** — surface the single best and worst daily P&L on the Dashboard
- **Sortable Hold Time column in Trades table** — add an optional duration column (needs a responsive width pass first)
- **Equity high-water-mark line** on the cumulative P&L chart to visualise drawdowns — DONE 2026-06-04

## 2026-06-04 — Shipped
- **Equity high-water-mark line** on the Dashboard cumulative P&L chart — a dashed grey "Peak equity" line tracks the running maximum, so every peak-to-trough drawdown is visible directly on the curve; the hover tooltip also reports the live drawdown below the peak. A compact top legend now labels the two lines. (Pairs with the existing Max Drawdown stat card.)
- **R-multiple in Journal entry card headers** — each journal card now shows the realised R-multiple next to its $ P&L (when a stop-loss is set), mirroring the Trades table sub-line, so R-based traders can scan their journal in risk units. Reuses the same `calcRisk` formula.
- **Persist the Daily P&L chart range** (1W / 1M / All) across restarts via `localStorage` (`tradelog.dailyRange`). A trader who always reviews the last week no longer re-clicks 1W every launch. No JSON-store change.

### Deferred / next-up ideas (2026-06-04)
- **Sortable Hold Time column in Trades table** — still needs a responsive width pass before adding another column
- **Drawdown depth/duration stat** — now that the high-water mark is drawn, surface current drawdown ($ and % from peak) and longest underwater stretch as a Dashboard card
- **Thousands separators on money figures** — `1,234.50` formatting on Dashboard stat cards + table P&L for larger accounts (add an `fmtMoney` helper, apply consistently)
- **Best-trading-day-of-week breakdown** — mini-table of expectancy by weekday (Mon–Fri) to spot day-of-week edges/leaks
- **Per-symbol performance breakdown** on the Dashboard — win rate / total P&L grouped by symbol (mirrors the Strategy bucket mini-tables)

## 2026-06-05 — Shipped
- **Thousands separators on money figures** — new `fmtMoney()` helper renders dollar amounts as `+1,234.50` / `-9,870.10`, applied consistently across Dashboard stat cards (Net P&L, Avg Win/Loss, Max Profit/Drawdown, Expectancy), the Trades table P&L cell, the trade-detail modal (P&L + commission), the Journal card header, and the import preview. Much easier to read for larger accounts than raw `1234.5`. No data-shape change.
- **Current Drawdown stat card** on the Dashboard — shows how far current equity sits below its running high-water mark, in dollars with `% below peak` underneath; reads **"At new high"** when you're at peak equity. Pairs directly with the high-water-mark line shipped 2026-06-04 and the existing Max Drawdown card (worst single trade), so a trader sees *live* risk state, not just the historical worst. Computed in `stats()` from the same peak/cum walk used for `maxDD`.
- **By-Symbol performance breakdown** on the Dashboard — a mini-table (Symbol · Trades · Win% · Net P&L, with a magnitude bar) grouping all trades by instrument, sorted by total P&L. Instantly answers "which products actually make me money?" — a common blind spot. Reuses the Strategy view's `.bdt`/`.bd-bar` styling; no new CSS.

### Deferred / next-up ideas (2026-06-05)
- **Sortable Hold Time column in Trades table** — still pending a responsive width pass
- **Longest underwater stretch** — complement Current DD with the longest run (in trades or days) spent below a prior peak
- **Best-trading-day-of-week breakdown** — expectancy by weekday (Mon–Fri) to spot day-of-week edges/leaks
- **Per-symbol breakdown: add R + expectancy columns** — extend the new By-Symbol table with avg R and $/trade once Avg R lands
- **Thousands separators in CSV export numbers stay raw (correct)** — but consider a locale-aware display-only column set if users ask

## 2026-06-06 — Shipped
- **By-Day-of-Week performance breakdown** on the Dashboard — a mini-table (Day · Trades · Win% · Avg/Trade · Net P&L, with a magnitude bar) grouping every trade by the weekday of its entry, in Mon→Sun order. Answers "do I have a day-of-week edge or leak?" — a common blind spot. Reuses the `.bdt`/`.bd-bar` styling, hides with the rest of the Dashboard when there's no data. (Distinct from the Best/Worst *single* Day stat still pending in open PR #4.)
- **"Avg/Trade" ($) column on the By-Symbol breakdown** — the existing per-symbol table now shows average $ result per trade alongside the running Net P&L, so a high total driven by one fat trade vs. a steady per-trade edge is distinguishable at a glance.
- **Unsaved journal-note guard** — closing the trade/journal modal (Cancel, ×, or Escape) while you have unsaved edits now prompts "You have unsaved journal changes. Discard them?" before discarding. Directly protects the app's most precious data — journal notes — from a stray keystroke. Implemented via a `currentModalNote()`/`modalIsDirty()` baseline captured on open; Save bypasses the guard (its state is already the clean baseline). No data-shape change.

### Deferred / next-up ideas (2026-06-06)
- **Sortable Hold Time column in Trades table** — still pending a responsive width pass
- **Longest underwater stretch** — complement Current DD with the longest run (trades/days) spent below a prior equity peak
- **Per-symbol / per-weekday: add Avg R column** once the shared `tradeR()` helper from PR #4 lands (avoid duplicating the R formula)
- **Dirty-guard the "Clear Data" actions too** — confirm exists, but consider an undo/soft-delete so a mis-click can't wipe an imported log
- **Best/worst hour-of-day breakdown** — for intraday traders, mirror the weekday table by entry hour

## 2026-06-07 — Shipped
- **Avg R stat card on Dashboard** — shows the average realised R-multiple across trades that have a stop-loss set (P&L ÷ amount risked), with a `N trades w/ stop` sub-line. The risk-adjusted twin of the existing $ Expectancy card, so R-based traders see their edge in risk units, not just dollars. Reuses `calcRisk`; only the same R formula already used in the Trades table and Journal headers. No data-shape change.
- **Best Day / Worst Day stat cards on Dashboard** — surface the single most-profitable and worst trading day (net P&L summed per calendar date), each with the date as a sub-line. Outlier days that flatter or wreck an otherwise steady curve are now visible at a glance. Pure derivation from existing `trades`; no new persistence.
- **Persist Strategy (Cup & Handle) filters + sort** — the strategy view now remembers its symbol/TF/size/outcome/date filters and table sort across restarts via `localStorage` (`tradelog.cnhFilters`), mirroring the Trades-view persistence shipped 2026-06-01. Dynamic selects (symbol/TF/size) are re-applied once their option lists are rebuilt from the imported events. Added `applyCnhSortIndicator()` so the restored sort arrow shows on load. Separate from the JSON event store — no risk to saved data.

### Deferred / next-up ideas (2026-06-07)
- **Sortable Hold Time column in Trades table** — still pending a responsive width pass before adding another column
- **Longest underwater stretch** — complement Current DD with the longest run (in trades or days) spent below a prior peak
- **`/` keyboard shortcut to focus the Trades search box** — fast keyboard-driven filtering for power users
- **Avg R per symbol / per weekday** — extend the By-Symbol and By-Day-of-Week dashboard tables with an Avg R column now that Avg R is computed (factor out a shared `tradeR()` helper to avoid duplicating the formula)
- **Best/worst hour-of-day breakdown** — for intraday traders, mirror the weekday table by entry hour

## 2026-06-11 — Shipped
- **Current Streak stat card on the Dashboard** — shows the run of consecutive winning or losing trades ending at the most recent trade (e.g. `3W` green / `2L` red), with a `wins/losses in a row` sub-line. Distinct from the existing Max Consec Wins (historical longest); this is the *live* state. A long losing streak is a classic tilt cue, so surfacing it nudges sizing-down / stepping away. Computed in `stats()` from the same chronological `sorted` walk already used for drawdown; a breakeven trade ends the streak; hidden when no win/loss exists yet. No data-shape change.
- **Payoff Ratio stat card on the Dashboard** — average winner ÷ average loser (e.g. `2.15 : 1`), green when ≥ 1. Paired with Win Rate it defines the edge: a low win rate still profits if winners are big enough relative to losers. Reuses the `avgW`/`avgL` already in `stats()`; shows `∞` when there are no losses. No data-shape change.
- **By-Month performance breakdown on the Dashboard** — a mini-table (Month · Trades · Win% · Avg/Trade · Net P&L, with a magnitude bar) grouping every trade by the calendar month of its entry, in chronological order. Answers "am I consistent month-over-month, or is one month carrying the year?" — the natural complement to the existing By-Symbol / By-Day-of-Week / By-Hour (PR #9) tables. Reuses the `.bdt`/`.bd-bar` styling (no new CSS), hides with the rest of the Dashboard when there's no data, skips undated trades.

### Deferred / next-up ideas (2026-06-11)
- **Sortable Hold Time column in Trades table** — the `.tw` wrapper already scrolls horizontally, so this is now mostly safe; add a `holdMs` sortable column (special-case it in `getFiltered()`'s sort like `entryTime`)
- **Drawdown-aware sizing hint** — when Current DD is deep, surface a suggested reduced size on the import/settings panel
- **By-Month / By-Symbol Avg R column** — once the shared `tradeR()` helper from PR #4 lands, add an Avg R column to the breakdown tables
- **Expected value / breakeven win rate readout** — given the Payoff Ratio, show the win rate needed to break even (1 ÷ (1 + payoff)) as a tooltip or sub-line
- **Calendar heat-map of daily P&L** — a month grid coloured by daily net, a richer view than the Daily P&L bar chart
