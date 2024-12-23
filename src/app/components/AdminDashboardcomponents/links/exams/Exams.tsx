"use client";
import React from "react";
import TestPapers from "../../onetimeusedcomponents/testpapers/TestPapers";
import StatisticsGraph from "../../main/statisticsgraph/StatisticsGraph";
import DatabaseTable from "../../main/databasetable/DatabaseTable";
import TopRankingStudents from "../../onetimeusedcomponents/toprankingstudents/TopRankingStudents";

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
        {/* <TopRankingStudents /> */}
      </div>
    </>
  );
};

export default Exams;
