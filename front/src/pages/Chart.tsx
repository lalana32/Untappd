import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import ChartOne from '../components/Charts/ChartOne';
import ChartThree from '../components/Charts/ChartThree';
import UserNotLoggedIn from '../components/UserNotLoggedIn';
import { useAppSelector } from '../configureStore';

const Chart: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) return <UserNotLoggedIn />;
  return (
    <>
      <Breadcrumb pageName="Statistics" />

      <div className="flex flex-col gap-4 md:gap-6 2xl:gap-7.5 min-h-screen">
        <div>
          <ChartOne />
        </div>
        <div>
          <ChartThree />
        </div>
      </div>
    </>
  );
};

export default Chart;
