import { migrate, seed } from "#postgres/knex.js";
import cron from "#cron.js";
import { CronJob } from "cron";
await migrate.latest();
await seed.run();
const job = new CronJob("0 * * * *", async () => {
    await cron();
});
job.start();
