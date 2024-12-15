"use client";
import React from "react";
import DatabaseTable from "@/app/components/UserDashboardcomponents/main/databasetable/DatabaseTable";
import StatisticsGraph from "@/app/components/UserDashboardcomponents/main/statisticsgraph/StatisticsGraph";
import TestPapers from "@/app/components/UserDashboardcomponents/onetimeusedcomponents/testpapers/TestPapers";
import TopRankingStudents from "@/app/components/UserDashboardcomponents/onetimeusedcomponents/toprankingstudents/TopRankingStudents";


const Exams = () => {
  return (
    <>
      <div>
        <TestPapers/>
        <div className="flex gap-4 mt-6">
          <div className="flex-1">
            <StatisticsGraph />
          </div>
        </div>
        <div className=" mt-6">

        <DatabaseTable />
        </div>
        <TopRankingStudents />
      </div>
    </>
  );
};

export default Exams;
