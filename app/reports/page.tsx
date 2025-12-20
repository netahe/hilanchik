import { getSession } from "@/auth";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { hoursTable } from "@/lib/schema";

export default async function Reports() {
  const session = await getSession();
  const reports = await db
    .select()
    .from(hoursTable)
    .where(eq(hoursTable.worker, session?.user?.email ?? ""));

  return (
    <table>
      <thead>
        <tr>
          <th>תאריך</th>
          <th>התחלה</th>
          <th>סיום</th>
        </tr>
      </thead>
      <tbody>
      {reports.map((report) => (
        <tr key={report.day}>
          <td>{report.day}</td>
          <td>{report.start}</td>
          <td>{report.end}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}
