'use client'

import { addDailyReport } from "@/lib/actions";
import { Button, Form, Input } from "@heroui/react";

export const DailyReportForm = () => {
  return (
    <Form className="w-full max-w-xs" action={addDailyReport}>
      <Input name="day" type="date" label="תאריך" />
      <Input name="start" type="time" label="שעת התחלה" />
      <Input name="end" type="time" label="שעת סיום" />
      <Button type="submit">שמירה</Button>
    </Form>
  );
};
