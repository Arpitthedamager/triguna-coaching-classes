"use client";

import CircularProgress from "../../main/circularprogress/CircularProgress";
import StatisticsGraph from "../../main/statisticsgraph/StatisticsGraph";
import Profile from "../../onetimeusedcomponents/profile/Profile";
import Header from "../../reused/header/Header";

const ProfileLink: React.FC = () => {
  return (
    <>
      <Header />
      <Profile />
      <div className="flex gap-4">
        <div className="flex-1">
          <StatisticsGraph />
        </div>
        <div className="flex-none">
          <CircularProgress/>
        </div>
      </div>
      <div className="flex-none">
      </div>
    </>
  );
};

export default ProfileLink;
