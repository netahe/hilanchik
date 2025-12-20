import { updateWages } from "@/lib/workday";

export default function Settings () {
    return <form action={updateWages}>
        <label>שכר לשעה<input name="hourlyWage" type="number" /></label>
        <label>דמי נסיעות ליום<input name="travelFees" type="number" /></label>
        <button type="submit">שמירה</button>
    </form>
}