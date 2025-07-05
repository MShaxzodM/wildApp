/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function seed(knex) {
    // Deletes ALL existing entries
    await knex("warehouses").del();
    await knex("warehouses").insert([
        {
            date: "2024-02-01",
            boxDeliveryAndStorageExpr: "160",
            boxDeliveryBase: "48",
            boxDeliveryLiter: "11,2",
            boxStorageBase: "0,1",
            boxStorageLiter: "0,1",
            warehouseName: "Коледино",
        },
    ]);
}
