import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import agent from '../data/agent';
import { User } from '../models/user';
import { useAppSelector } from '../configureStore';
import { CheckInDTO } from '../models/checkIn';

const UserProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const loggedUser = useAppSelector((state) => state.auth.user);
  const [checkIns, setCheckIns] = useState<CheckInDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await agent.Auth.getUserById(userId!);
        setUser(response);

        const userCheckIns = await agent.CheckIns.getCheckInsByUserId(userId!);
        setCheckIns(userCheckIns);

        const followedUsers = await agent.Follower.getFollowedUsers(
          loggedUser?.id!,
        );
        setIsFollowing(
          followedUsers.some(
            (followedUser: User) => followedUser.id === userId,
          ),
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId, loggedUser?.id]);

  const handleFollow = async () => {
    try {
      await agent.Follower.followUser(loggedUser!.id, userId!);
      setIsFollowing(true);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await agent.Follower.unfollowUser(loggedUser!.id, userId!);
      setIsFollowing(false);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  if (!user) return;

  if (!loading)
    return (
      <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
        <div className="flex items-center space-x-6">
          <img
            src={user.profilePictureUrl}
            alt={`${user.userName}'s profile`}
            className="w-32 h-32 rounded-full object-cover"
          />
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              {user.userName}
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
              {user.firstName} {user.lastName}
            </p>

            {loggedUser && loggedUser.id !== userId && (
              <div className="mt-4">
                {isFollowing ? (
                  <button
                    onClick={handleUnfollow}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={handleFollow}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Follow
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Check-Ins
          </h2>
          {checkIns.length > 0 ? (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Beer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {checkIns.map((checkIn) => (
                    <tr key={checkIn.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        {checkIn.beerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        {checkIn.rating}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(checkIn.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {checkIn.notes || 'No notes'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              No check-ins available.
            </p>
          )}
        </div>
      </div>
    );
};

export default UserProfilePage;
