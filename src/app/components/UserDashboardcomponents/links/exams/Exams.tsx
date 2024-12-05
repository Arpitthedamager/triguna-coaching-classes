"use client";
import React from "react";
import DatabaseTable from "../../main/databasetable/DatabaseTable";
import TopRankingStudents from "../../onetimeusedcomponents/toprankingstudents/TopRankingStudents";
import StatisticsGraph from "../../main/statisticsgraph/StatisticsGraph";
import TestPapers from "../../onetimeusedcomponents/testpapers/TestPapers";

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
