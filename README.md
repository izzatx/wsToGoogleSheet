# 📲 WhatsApp to Google Sheet Automation

This Google Apps Script project automatically parses a text file (e.g., `wsDauh.txt`) from Google Drive, extracts prefixed IDs, links, and web page titles, and logs them into a Google Sheet. It is designed for WhatsApp message processing and indexing.

---

## 🚀 Features

- Extracts WhatsApp-style timestamps, custom IDs (e.g., `H01`, `F23`), and links from `.txt` files
- Auto-fetches the web page title from each URL
- Appends extracted data to a specified Google Sheet

---

## 🔧 Dependencies

This script uses the following built-in Google Apps Script services:

- `DriveApp` — to access files in Google Drive
- `SpreadsheetApp` — to write to Google Sheets
- `UrlFetchApp` — to fetch webpage titles from URLs

---

## ⚙️ Setup Guide

### 1. Push to Google Apps Script

```bash
npm install -g @google/clasp
clasp login
clasp push
```

### 2. Open the Script in the Browser

```
clasp open
```

### 3. Authorize the Script (First-Time Only)

1. In the Apps Script editor, choose the function processWhatsAppFile from the dropdown
2. Click the ▶️ Run button
3. A Google authorization dialog will appear — review and approve the required permissions
