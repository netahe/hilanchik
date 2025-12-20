import { addDailyReport } from "@/lib/workday";

export default function Update () {

    return <form className="flex flex-col" action={addDailyReport}>
    <label>תאריך <input name="day" type="date" /></label>
    <label>שעת התחלה<input name="start" type="time"/></label>
    <label>שעת סיום<input name="end" type="time"/></label>
    <button type="submit">שמירה</button>
    </form>
}