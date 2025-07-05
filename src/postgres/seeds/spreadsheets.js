/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */

export async function seed(knex) {
    await knex("spreadsheets")
        .insert([{ spreadsheet_id: "135hX_lPrfwlvqe7BxsOrcPEN8BJQMJ0jHqP06sLQ9VQ" }])
        .onConflict(["spreadsheet_id"])
        .ignore();
}
