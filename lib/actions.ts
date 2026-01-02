'use server'

import { getSession } from '@/auth';
import dayjs, { Dayjs } from 'dayjs';
import { insertDailyReport, insertWages, selectPeriodicReport } from './db';

export const  addDailyReport = async (formData: FormData) => {
    'use server'

    const day = formData.get('day') as string
    const start = formData.get('start') as  string
    const end = formData.get('end') as string
    const session =  await getSession();

    insertDailyReport(session?.user?.email ?? "", day, start, end)
};

export const updateWages = async (formData: FormData) => {
    'use server'

    const hourlyWage = formData.get('hourlyWage');
    const travelFees = formData.get('travelFees');
    const session = await getSession();

    return insertWages(session?.user?.email ?? "", hourlyWage as string, travelFees as string);

}

export const getPeriodicReport = async (prevState, formData: FormData) => {
    return selectPeriodicReport(formData);
};
export const calculateDailyWage = async (start: dayjs.Dayjs, end: dayjs.Dayjs, rate: number) => {};