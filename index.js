"use strict";

function processWhatsAppFile() {
  const folderId =
    PropertiesService.getScriptProperties().getProperty("FOLDER_ID"); // Replace with your folder ID
  const sheetId =
    PropertiesService.getScriptProperties().getProperty("SHEET_ID"); // Replace with your Google Sheet ID
  const sheetName = "testing"; // Replace with your sheet name
  const prefix = "H"; // Only extract F-prefixed IDs

  try {
    const folder = DriveApp.getFolderById(folderId);
    const files = folder.getFilesByName("wsDauh.txt");
    const sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);

    if (!sheet) {
      console.log(`Sheet with name '${sheetName}' does not exist.`);
      return;
    }
    if (!files.hasNext()) {
      console.log("No ws.txt file found in the folder.");
      return;
    }

    const file = files.next();
    const content = file.getBlob().getDataAsString();
    console.log("File content:", content); // DEBUG: Check file content

    const lines = content.split("\n").map((line) => line.trim());
    const extractedData = [];

    // Regex to match certain Fixed prefixes
    const idRegex = new RegExp(`\\b(${prefix}\\d{1,3})\\b`);
    const linkRegex = /https?:\/\/[^\s]+/;

    for (let i = 0; i < lines.length; i++) {
      let idMatch = lines[i].match(idRegex);
      let linkMatch = lines[i].match(linkRegex);

      console.log(`Checking line: ${lines[i]}`);
      console.log(`ID Match:`, idMatch);
      console.log(`Link Match:`, linkMatch);

      let dateMatch = lines[i].match(
        /^\[\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}(:\d{2})?\s?(AM|PM)?\]/
      );
      console.log(`Date Match:`, dateMatch);

      if (idMatch) {
        let id = idMatch[0]; // Extracted F-ID
        let date = dateMatch
          ? dateMatch[0].replace(/[\[\]]/g, "")
          : "Unknown Date";

        // If no link is found on the same line, scan the next 2 lines max
        let j = i + 1;
        while (!linkMatch && j < lines.length && j < i + 3) {
          let nextLineMatch = lines[j].match(linkRegex);
          if (nextLineMatch) {
            linkMatch = nextLineMatch;
          }
          j++;
        }

        if (linkMatch) {
          let link = linkMatch[0];

          // Fetch title from the link
          let title = "Unknown Title";
          try {
            const response = UrlFetchApp.fetch(link, {
              muteHttpExceptions: true,
            });
            if (response.getResponseCode() === 200) {
              const html = response.getContentText();
              const titleMatch = html.match(/<title>(.*?)<\/title>/);
              title = titleMatch ? titleMatch[1].trim() : "Unknown Title";
            } else {
              console.log(
                `Failed to fetch URL: ${link}, Response Code: ${response.getResponseCode()}`
              );
            }
          } catch (fetchError) {
            console.log(`Error fetching ${link}: ${fetchError}`);
          }

          extractedData.push([date, id, link, title]);
        }
      }
    }

    console.log("Extracted Data:", extractedData); // DEBUG: Check extracted data

    // Append extracted data to Google Sheet
    if (extractedData.length > 0) {
      console.log(`Attempting to write ${extractedData.length} rows to sheet`);
      sheet
        .getRange(sheet.getLastRow() + 1, 1, extractedData.length, 4)
        .setValues(extractedData);
      console.log(
        `Data successfully added to the sheet for prefix '${prefix}'!`
      );
    } else {
      console.log(`No valid data found for prefix '${prefix}' in ws.txt.`);
    }
  } catch (error) {
    console.error("Error processing file:", error);
  }
}
