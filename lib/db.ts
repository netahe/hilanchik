import { drizzle } from "drizzle-orm/node-postgres";
import { eq, sql, and, lte, gte, getTableColumns, sum } from 'drizzle-orm';
import { Dayjs } from "dayjs";
import { hoursTable, ratesTable } from "./schema";
import { getSession } from "@/auth";
import { PeriodicReport } from "./interfaces";

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

export const selectPeriodicReport = async (formData: FormData): Promise<PeriodicReport> => {
    const start = formData.get('start') ?? "";
    const end = formData.get('end') ?? "";
    const durationInHours = sql<number>`round((extract(epoch from ${hoursTable.end} -  ${hoursTable.start})/3600)::numeric, 2)`;

    const worker = (await getSession())?.user?.email;


    const hours = db
        .select({
            ...getTableColumns(hoursTable),
            durationInHours: durationInHours.as('duration_in_hours')
        })
        .from(hoursTable)
        .where(
            and(
                eq(hoursTable.worker, worker ?? ""),
                lte(hoursTable.day, end as string),
                gte(hoursTable.day, start as string)
            )).as('hours_with_duration');


    const wagesSubquery = db.select({ 
        start: hours.start,
        end: hours.end,
        day: hours.day,
        durationInHours: hours.durationInHours,
        travelFees: hours.travelFees,
        hourlyWage: hours.hourlyWage,
        dailyWage: sql<number>`duration_in_hours * "hourlyWage" + "travelFees"`.as('total_wage')
    })
    .from(hours).as('wages');

    const report = db.select().from(wagesSubquery);
    const totals = db.select({total: sum(wagesSubquery.dailyWage)}).from(wagesSubquery);

    return {reports: await report, earnings: parseInt((await totals)?.[0].total ?? '0')};
};