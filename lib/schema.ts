import { date, integer, numeric, pgTable, time, varchar } from "drizzle-orm/pg-core";

export const hoursTable = pgTable("hours", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
    worker: varchar({length: 255}).notNull(),
    start: time().notNull(),
    end: time().notNull(),
    day: date().notNull(),
    hourlyWage: numeric().notNull(),
    travelFees: numeric()
});

export const ratesTable = pgTable("rates", {
    worker: varchar({length: 255}).primaryKey(),
    currentTravelFees: numeric(),
    currentHourlyWage: numeric().notNull()
})