"use client"

import { PeriodSelectionForm } from "./periodSelectionForm";
import { getPeriodicReport } from "@/lib/actions";
import React from "react";
import { PeriodicReport } from "./reportTable";

export default  function Reports() {

  const [periodicReport, requestPeriodicReport] = React.useActionState(getPeriodicReport, {earnings: 0, reports: []});

  return (
    <>
      <PeriodSelectionForm onSubmit={requestPeriodicReport} />
      <PeriodicReport periodicReport={periodicReport} />
    </>
  );
}
