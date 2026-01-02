export interface WorkdayReport {
    worker: string;
    day: string;
    start: string;
    end: string;
    hourlyWage: number;
    travelFees?: number;
}

export interface DailyReport {
    worker: string;
    start: string;
    end: string;
    day: string;

    hourlyWage: number;
    travelFees?: number;
    earnings: number;
}

export interface PeriodicReport {
    worker: string;
    total: number;
    reports: DailyReport[];
    totalWage: number;
}