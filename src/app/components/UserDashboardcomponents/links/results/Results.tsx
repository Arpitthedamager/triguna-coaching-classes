"use client";
import React from "react";
import DatabaseTable from "@/app/components/UserDashboardcomponents/main/databasetable/DatabaseTable";
import TopRankingStudents from "@/app/components/UserDashboardcomponents/onetimeusedcomponents/toprankingstudents/TopRankingStudents";
import StatisticsGraph from "@/app/components/UserDashboardcomponents/main/statisticsgraph/StatisticsGraph";

const Results = () => {
  return (
    <>
      <div>
        <TopRankingStudents/>
        <div className="my-6">

        <StatisticsGraph/>
        </div>
        <DatabaseTable />
      </div>
    </>
  );
};

export default Results;
