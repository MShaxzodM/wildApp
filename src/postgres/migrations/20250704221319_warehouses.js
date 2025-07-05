/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    return knex.schema.createTable("warehouses", (table) => {
        table.date("date");
        table.string("warehouseName");
        table.string("boxDeliveryAndStorageExpr");
        table.string("boxDeliveryBase");
        table.string("boxDeliveryLiter");
        table.string("boxStorageBase");
        table.string("boxStorageLiter");
    });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    return knex.schema.dropTable("warehouses");
}
