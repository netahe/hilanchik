import { drizzle } from "drizzle-orm/node-postgres";
import { eq, sql } from 'drizzle-orm';
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
    console.log('calling insertWages()');
    await db.insert(ratesTable).values({
        worker,
        currentHourlyWage: `${hourlyRate}`,
        currentTravelFees: `${travelFees}`
    }).onConflictDoUpdate({ 
        target: ratesTable.worker, 
        set: { 
            currentHourlyWage: sql.raw(`excluded."${ratesTable.currentHourlyWage.name}"`), 
            currentTravelFees: sql.raw(`excluded."${ratesTable.currentTravelFees.name}"`) 
        } 
    })
}

export const updateWages = async (worker: string, hourlyRate: string, travelFees: string) => {
    await db.update(ratesTable).set({ currentHourlyWage: hourlyRate, currentTravelFees: travelFees }).where(eq(ratesTable.worker, worker))
}

export const selectRates = async (worker: string) => {
    return await await db
        .select({ wage: ratesTable.currentHourlyWage, travel: ratesTable.currentTravelFees })
        .from(ratesTable)
        .where(eq(ratesTable.worker, worker));
}

const selectPeriodicReport = (start: Dayjs, end: Dayjs) => {

};