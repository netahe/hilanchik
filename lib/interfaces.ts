export interface WorkdayReport {
    worker: string;
    day: string;
    start: string;
    end: string;
    hourlyWage: number;
    travelFees?: number;
}

export interface DailyReport {
    start: string;
    end: string;
    day: string;

    hourlyWage: number;
    travelFees?: number;
    earnings: number;
    dailyWage: number;
}

export interface PeriodicReport {
    earnings: number;
    reports: Pick<DailyReport, 'start' | 'end' | 'day' | 'dailyWage'>[];
}