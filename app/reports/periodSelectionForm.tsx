"use client"

import { Button, Form, Input } from "@heroui/react";

export const PeriodSelectionForm = ({onSubmit}: {onSubmit: (formData:FormData) => void | Promise<void> | undefined}) => {
    return (
        <Form action={onSubmit}>
            <Input name="start" type="date" label="תאריך התחלה" />
            <Input name="end" type="date" label="תאריך סיום" />
            <Button type="submit">שליחה</Button>
        </Form>
    )
};