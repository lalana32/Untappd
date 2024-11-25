import React, { useEffect, useState } from 'react';
import agent from '../../data/agent';
import { CheckInDTO } from '../../models/checkIn';
import { useAppSelector } from '../../configureStore';
import AddFriend from '../../../public/photos/add-friend.png';
import UserNotLoggedIn from '../../components/UserNotLoggedIn';
import CheckInPost from '../../components/CheckInPost';

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

  const toggleLike = async (checkIn: CheckInDTO) => {
    try {
      const response = await agent.Likes.toggleLike(checkIn.id, user?.id!);
      setCheckIns((prevCheckIns) =>
        prevCheckIns.map((item) =>
          item.id === checkIn.id
            ? {
                ...item,
                isLikedByCurrentUser: !item.isLikedByCurrentUser,
                likes: item.isLikedByCurrentUser
                  ? item.likes.filter((like) => like.userId !== user?.id!) // Ukloni "like"
                  : [
                      ...item.likes,
                      {
                        id: Date.now(),
                        userId: user?.id!,
                        checkInId: item.id,
                      },
                    ],
              }
            : item,
        ),
      );
      console.log(response);
    } catch (error) {
      console.log('ne valja kume', error);
    }
  };

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
      <div className="flex flex-col items-center space-y-20 p-8">
        {checkIns.map((checkIn) => (
          <CheckInPost
            key={checkIn.id}
            checkIn={checkIn}
            toggleLike={toggleLike}
          />
        ))}
      </div>
    </>
  );
};

export default Feed;
