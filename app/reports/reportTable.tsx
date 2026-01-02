import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { PeriodicReport as PeriodicReportType } from '@/lib/interfaces';

interface Props {
  periodicReport: PeriodicReportType;
}

export const PeriodicReport = ({ periodicReport }: Props) => {
    console.log(periodicReport.earnings);
  return (
    <>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>תאריך</TableColumn>
          <TableColumn>התחלה</TableColumn>
          <TableColumn>סיום</TableColumn>
          <TableColumn>סה"כ</TableColumn>
        </TableHeader>
        <TableBody>
          {periodicReport.reports.map(
            ({ start, end, day, dailyWage }, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell>{day}</TableCell>
                  <TableCell>{start}</TableCell>
                  <TableCell>{end}</TableCell>
                  <TableCell>{dailyWage}</TableCell>
                </TableRow>
              );
            }
          ) ?? []}
        </TableBody>
      </Table>
      <Table>
        <TableHeader>
          <TableColumn>סה"כ</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{periodicReport.earnings ?? ""}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
