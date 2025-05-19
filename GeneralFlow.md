# 🧭 Step-by-Step Guide

## ✅ 1. Locate Your **Folder ID**

After extracting your `ws.txt` file from WhatsApp, upload it to a folder in Google Drive.  
The **Folder ID** is the string that comes **after `folders/`** in the Drive URL.<br>
→ https://drive.google.com/drive/folders/[your-folder-id]
![Guide Screenshot](./assets/img//generalFlow/folderID.png)

## ✅ 2. Locate Your **Sheet ID**

The **Sheet ID** refers to the Google Sheet where your data will be saved.  
It appears **after `/d/` and before `/edit`** in the Sheet URL.<br>
→ https://docs.google.com/spreadsheets/d/[your-sheet-id]/edit
![Guide Screenshot](./assets/img//generalFlow/sheetID.png)

## ✅ 3. Set Your **Desired Prefix**

In this example, we extract data with the prefix `G`.  
This will include all entries from `G1` to `G[end]`.

![Prefix G Example](./assets/img/generalFlow/prefixG.png)

---

## ✅ 4. Update Your **Script Properties** with IDs

Add your `Sheet ID` and `Folder ID` inside the **Google Apps Script** project properties.

![Script Properties](./assets/img/generalFlow/scriptProperties.png)

---

## ✅ 5. Specify Your **Sheet Name**

Make sure that the sheet name in your script matches the actual tab name in your Google Sheet.

![Sheet Name Setup](./assets/img/generalFlow/sheetName.png)  
![Sheet Name Confirmation](./assets/img/generalFlow/sheetName1.png)
