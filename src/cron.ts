import axios from "axios";
import auth, { googleSheets } from "#config/googleauth.js";
import knex from "#postgres/knex.js";
type Warehouses = {
    date?: string;
    boxDeliveryAndStorageExpr: number;
    boxDeliveryBase: number;
    boxDeliveryLiter: number;
    boxStorageBase: number;
    boxStorageLiter: number;
    warehouseName: string;
};
type HeaderApiKey = string;
let ApiKey: HeaderApiKey = "";

export default async function cronjob() {
    const date = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Moscow" }).split("T")[0];

    try {
        const data = await axios.get("https://common-api.wildberries.ru/api/v1/tariffs/box", { headers: { "Authorization": ApiKey } });

        let warehouses: Warehouses[] = data.data.response.data.warehouseList.map((e: any) => {
            e.date = date;
            return e;
        });
        warehouses.sort((a, b) => a.boxDeliveryAndStorageExpr - b.boxDeliveryAndStorageExpr);
        await knex("warehouses").where("date", date).del();
        await knex("warehouses").insert(warehouses);
        warehouses = warehouses.map((obj) => {
            delete obj.date;
            return obj;
        });

        const arrayData = warehouses.map((el) => Object.values(el));
        const arrayNames = warehouses.map((e) => Object.keys(e));
        let spreadsheetIds = await knex("spreadsheets").select();
        spreadsheetIds.map(async (IdObj) => {
            const spreadsheetId = IdObj.spreadsheet_id;
            await googleSheets.spreadsheets.values.clear({
                auth,
                spreadsheetId,
                range: "Sheet1",
            });

            await googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: "Sheet1!A1:A1",
                valueInputOption: "USER_ENTERED",
                requestBody: { values: [[date]] },
            });
            await googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: "Sheet1!2:2",
                valueInputOption: "USER_ENTERED",
                requestBody: {
                    values: [arrayNames[0]],
                },
            });
            await googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: "Sheet1!A3",
                valueInputOption: "USER_ENTERED",
                requestBody: {
                    values: arrayData,
                },
            });
        });
    } catch (error) {
        console.log("Authorization failed");
    }
}
