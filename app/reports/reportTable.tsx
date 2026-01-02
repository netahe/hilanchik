import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

interface Props {
  periodicReport: {
    report: { start: string; end: string; day: string; totalWage: number }[];
    totals: { total: string };
  };
}

export const PeriodicReport = ({ periodicReport }: Props) => {
    console.log(periodicReport.totals);
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
          {...periodicReport.report?.map?.(
            ({ start, end, day, totalWage }, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell>{day}</TableCell>
                  <TableCell>{start}</TableCell>
                  <TableCell>{end}</TableCell>
                  <TableCell>{totalWage}</TableCell>
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
            <TableCell>{periodicReport.totals?.[0]?.total ?? ""}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
