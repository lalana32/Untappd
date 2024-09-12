import { useState, useEffect } from 'react';
import { useAppSelector } from '../../configureStore';
import agent from '../../data/agent';
import { CheckInDTO } from '../../models/checkIn';
import BeerBotle from '../../../public/photos/beer-bottle.png';
import { useNavigate } from 'react-router-dom';
import Loader from '../../common/Loader';
import UserNotLoggedIn from '../UserNotLoggedIn';

const Table = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.id;
  const [checkIns, setCheckIns] = useState<CheckInDTO[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCheckIns = async () => {
      try {
        // Zamenite URL sa stvarnim URL-om vašeg API-ja
        const response = await agent.CheckIns.getCheckInsByUserId(userId!);

        setCheckIns(response);
      } catch (error) {
        console.error('Error fetching check-ins:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckIns();
  }, [userId]);

  console.log(checkIns);

  if (!user) return <UserNotLoggedIn />;

  if (loading) return <Loader />;

  if (checkIns.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50 dark:bg-boxdark">
        <div className="flex flex-col items-center space-y-4">
          <img
            src={BeerBotle} // Ovde stavite putanju do slike koja simbolizuje praznu listu
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
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          My Check Ins
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Beer</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Brewery</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Rating</p>
        </div>
        <div className="col-span-1 flex items-center"></div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Date</p>
        </div>
      </div>

      {checkIns.map((checkIn, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md overflow-hidden">
                <img
                  src={checkIn.beerImageUrl}
                  alt="Product"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-sm text-black dark:text-white">
                {checkIn.beerName}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {checkIn.brewery}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {checkIn.rating}
            </p>
          </div>
          <div className="col-span-1 flex items-center"></div>
          <div className="col-span-1 flex items-center">
            {new Date(checkIn.date).toLocaleDateString('hr-HR')}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
