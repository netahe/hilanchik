import { getSession } from "@/auth";
import RatesForm from "./RatesForm";
import { selectRates } from "@/lib/db";

export default async function Settings () {
    const session = await getSession();
    const rates = await selectRates(session?.user?.email ?? "") ?? {travel: undefined, wage: undefined};

    return <RatesForm rates={rates[0] ?? {wage: "", travel: ""}} />
}