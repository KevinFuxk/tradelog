# TradeLog — Personal Trading Journal

A desktop trading journal app built with Electron. Import TradingView CSV exports and get instant analytics, charts, and a per-trade notes journal.

---

## Features

- **CSV Import** — drag-and-drop or browse, auto-detects TradingView export formats
- **Dashboard** — cumulative P&L chart, win/loss donut, daily P&L bars, 8 stat cards
- **Trade History** — sortable/filterable table (symbol, side, win/loss, date range)
- **Journal** — per-trade notes, saved locally to your machine
- **Persistent** — all data saved to your OS user data folder (no cloud, no account)

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- npm

### Install & Run

```bash
# 1. Enter the project folder
cd tradelog

# 2. Install dependencies
npm install

# 3. Launch the app
npm start
```

### Build a distributable

```bash
# macOS (.dmg)
npm run build:mac

# Windows (.exe installer)
npm run build:win

# Linux (.AppImage)
npm run build:linux
```

Built files will appear in the `dist/` folder.

---

## Importing from TradingView

1. Open TradingView with your Tickmill broker connected
2. Go to **Trade → Trade History**
3. Click the **Export** icon (download arrow) → saves a `.csv` file
4. In TradeLog, click **Import CSV** or drag the file onto the Import page

The parser handles both:
- **Standard broker export** — one row per closed trade
- **Strategy Tester export** — paired Entry/Exit rows with a Trade # column

---

## Data Storage

Notes and trade history are saved as JSON files in your OS user data directory:

| OS      | Location                                        |
|---------|-------------------------------------------------|
| macOS   | `~/Library/Application Support/tradelog/`       |
| Windows | `%APPDATA%\tradelog\`                           |
| Linux   | `~/.config/tradelog/`                           |

---

## Tech Stack

- **Electron** — cross-platform desktop shell
- **Chart.js** — P&L and analytics charts
- **JetBrains Mono + Syne** — fonts (loaded from Google Fonts, requires internet on first launch)
- Vanilla HTML/CSS/JS renderer — no React, no bundler needed

---

## Notes on Internet Requirement

The app loads fonts and Chart.js from CDN on first launch. After that, browsers cache them. If you need fully offline operation, download Chart.js and the fonts and swap the `<script src>` and `<link href>` tags in `src/index.html` to local file paths.
