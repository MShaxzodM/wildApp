import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
    keyFile: "wbappsheet.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
});
const googleSheets = google.sheets({ version: "v4", auth });
export default auth;
export { googleSheets };
