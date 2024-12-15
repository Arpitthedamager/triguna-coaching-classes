"use client";
import React from "react";
import DatabaseTable from "../../main/databasetable/DatabaseTable";
import TopRankingStudents from "../../onetimeusedcomponents/toprankingstudents/TopRankingStudents";
import StatisticsGraph from "../../main/statisticsgraph/StatisticsGraph";

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
