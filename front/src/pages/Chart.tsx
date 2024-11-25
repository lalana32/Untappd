import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import ChartOne from '../components/Charts/ChartOne';
import ChartThree from '../components/Charts/ChartThree';
import UserNotLoggedIn from '../components/UserNotLoggedIn';
import { RootState, useAppSelector } from '../configureStore';
import agent from '../data/agent';
import { CheckInDTO } from '../models/checkIn';
import { useNavigate } from 'react-router-dom';
import BeerBottle from '../../public/photos/beer-bottle.png';
import Loader from '../common/Loader';
import PredictionButton from '../components/PredictionButton';

const Chart: React.FC = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [checkIns, setCheckIns] = useState<CheckInDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50 dark:bg-boxdark">
        <div className="flex flex-col items-center space-y-4">
          <img
            src={BeerBottle} // Ovde stavite putanju do slike koja simbolizuje praznu listu
            alt="No Check-ins"
            className="w-60 h-60"
          />
          <h2 className="text-2xl font-semibold text-black dark:text-white">
            No Check-ins Yet
          </h2>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            You haven't added any check-ins yet. Start discovering new beers and
            share your experience!
          </p>
          <button
            onClick={() => navigate('/beers')}
            className="mt-6 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
          >
            Add Your First Check-In
          </button>
        </div>
      </div>
    );
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
