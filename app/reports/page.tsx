"use client"

import { PeriodSelectionForm } from "./periodSelectionForm";
import { getPeriodicReport } from "@/lib/actions";
import React from "react";
import { PeriodicReport } from "./reportTable";
import { useSession } from "next-auth/react";

export default  function Reports() {

  const session = useSession();
  const [periodicReport, requestPeriodicReport] = React.useActionState(getPeriodicReport, undefined);

  return (
    <>
      <PeriodSelectionForm onSubmit={requestPeriodicReport} />
      <PeriodicReport periodicReport={periodicReport ?? []} />
    </>
  );
}
