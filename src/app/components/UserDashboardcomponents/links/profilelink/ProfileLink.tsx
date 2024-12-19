"use client";

import CircularProgress from "../../main/circularprogress/CircularProgress";
import StatisticsGraph from "../../main/statisticsgraph/StatisticsGraph";
import Header from "../../reused/header/Header";
import Profile from "../../onetimeused/profile/Profile";

const ProfileLink: React.FC = () => {
  return (
    <>
      <Header />
      <Profile />
      <div className="md:flex gap-4">
        <div className="flex-1">
          <StatisticsGraph />
        </div>
        <div className="flex-none pt-10 md:pt-0">
          <CircularProgress/>
        </div>
      </div>
      <div className="flex-none">
      </div>
    </>
  );
};

export default ProfileLink;
