import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from 'drizzle-orm';
import { Dayjs } from "dayjs";
import { hoursTable, ratesTable } from "./schema";

export const db = drizzle(process.env.DATABASE_URL ?? "");

export const insertDailyReport = async (worker: string, day: string, start: string, end: string) => {
    const rate = await db
        .select({ wage: ratesTable.currentHourlyWage, travel: ratesTable.currentTravelFees })
        .from(ratesTable)
        .where(eq(ratesTable.worker, worker));

    await db.insert(hoursTable).values({
        worker,
        start,
        end,
        day,
        hourlyWage: rate[0].wage,
        travelFees: rate[0].travel
    });

};

export const insertWages = async (worker: string, hourlyRate: string, travelFees: string) => {
    await db.insert(ratesTable).values({ 
        worker, 
        currentHourlyWage: `${hourlyRate}`, 
        currentTravelFees: `${travelFees}` 
    })
}
const selectPeriodicReport = (start: Dayjs, end: Dayjs) => {

};