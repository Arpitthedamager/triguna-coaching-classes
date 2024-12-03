"use client";
import React from "react";
import DatabaseTable from "../../main/databasetable/DatabaseTable";
import TopRankingStudents from "../../onetimeusedcomponents/TopRankingStudents/TopRankingStudents";

const Results = () => {
  return (
    <>
      <div>
        <TopRankingStudents/>
        <DatabaseTable />
      </div>
    </>
  );
};

export default Results;
