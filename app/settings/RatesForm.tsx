"use client"

import { updateWages } from "@/lib/workday";
import { Button, Form, Input } from "@heroui/react";
import React from "react";

export default function RatesForm ({rates}: {rates: {wage: string, travel?: string | null}}) {
    const [wage, setWage] = React.useState(rates.wage);
    const [travel, setTravel] = React.useState(rates.travel);

    return <Form action={(values) => {updateWages(values)}}>
        <Input onChange={(e) => setWage(e.target.value)} value={wage} label="שכר לשעה" name="hourlyWage" type="number" />
        <Input onChange={(e) => setTravel(e.target.value)} value={travel ?? undefined} label="דמי נסיעות ליום" name="travelFees" type="number" />
        <Button type="submit">שמירה</Button>
    </Form>
}