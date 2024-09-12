import React, { useEffect, useState } from 'react';
import agent from '../../data/agent';
import { CheckInDTO } from '../../models/checkIn';
import { useAppSelector } from '../../configureStore';
import AddFriend from '../../../public/photos/add-friend.png';
import UserNotLoggedIn from '../../components/UserNotLoggedIn';

const Feed: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [checkIns, setCheckIns] = useState<CheckInDTO[]>([]);

  useEffect(() => {
    const fetchCheckIns = async () => {
      if (!user) return;
      try {
        const response = await agent.CheckIns.getCheckInFeed(
          user?.id!,
          user?.token,
        );

        setCheckIns(response);
      } catch (error) {
        console.error('Error fetching check-ins:', error);
      } finally {
      }
    };

    fetchCheckIns();
  }, []);

  if (!user) return <UserNotLoggedIn />;

  if (user && checkIns.length === 0)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Your Feed is Empty
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            It looks like you're not following anyone yet.
          </p>

          {/* Add Friend Image */}
          <div className="flex items-center justify-center mb-6">
            <img
              src={AddFriend}
              alt="Add friend"
              className="w-34 h-34 rounded-full border-4 border-gray-300 shadow-lg"
            />
          </div>
        </div>
      </div>
    );

  return (
    <>
      <div className="flex flex-col items-center space-y-50 p-8">
        {checkIns.map((checkIn) => (
          <div
            key={checkIn.id}
            className="w-full max-w-3xl rounded-lg shadow-lg overflow-hidden border border-gray-300 bg-white dark:bg-boxdark transform transition duration-500 hover:scale-105"
          >
            <div className="px-8 py-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <h2 className="text-3xl font-bold">
                {checkIn.firstName.charAt(0).toUpperCase() +
                  checkIn.firstName.slice(1).toLowerCase() || 'Anonimno'}{' '}
                {checkIn.lastName.charAt(0).toUpperCase() +
                  checkIn.lastName.slice(1).toLowerCase() || 'Korisnik'}{' '}
                is drinking {checkIn.beerName}
              </h2>
              <p className="text-md mt-2">
                {new Date(checkIn.date).toLocaleDateString('hr-HR')}
              </p>
            </div>

            <div className="h-72 w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
              <img
                src={checkIn.beerImageUrl}
                alt={checkIn.beerName}
                className="contained max-h-72"
              />
            </div>

            <div className="px-8 py-6">
              <div className="border-2 border-blue-500 text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400 rounded-lg p-4 text-center">
                Rating: <span className="font-semibold">{checkIn.rating}</span>
                /5
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Feed;
