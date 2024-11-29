import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import ChartOne from '../components/Charts/ChartOne';
import ChartThree from '../components/Charts/ChartThree';
import UserNotLoggedIn from '../components/UserNotLoggedIn';
import { RootState, useAppSelector } from '../configureStore';
import agent from '../data/agent';
import { CheckInDTO } from '../models/checkIn';
import Loader from '../common/Loader';
import NoCheckInsYet from '../components/NoCheckInsYet';

const Chart: React.FC = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [checkIns, setCheckIns] = useState<CheckInDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCheckIns = async () => {
      try {
        const response = await agent.CheckIns.getCheckInsByUserId(user?.id!);

        setCheckIns(response);
      } catch (error) {
        console.error('Error fetching check-ins:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckIns();
  }, [user?.id!]);

  if (!user) return <UserNotLoggedIn />;

  if (loading) return <Loader />;

  if (checkIns.length === 0) {
    return <NoCheckInsYet />;
  }

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
