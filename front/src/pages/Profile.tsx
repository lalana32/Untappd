import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useLocation, useNavigate } from 'react-router-dom';
import Cover from '../../public/photos/cover-photo.jpg';
import { useAppSelector } from '../configureStore';
import { useEffect, useRef, useState } from 'react';
import { CheckIn, CheckInDTO } from '../models/checkIn';
import agent from '../data/agent';
import { Follower } from '../models/follower';
import UserNotLoggedIn from '../components/UserNotLoggedIn';
import CheckInPost from '../components/CheckInPost';

const Profile = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.id;
  const location = useLocation();
  const { targetId } = location.state || {};

  const [checkIns, setCheckIns] = useState<CheckInDTO[]>([]);
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [followedUsers, setFollowedUsers] = useState<Follower[]>([]);
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFollowedUsersModalOpen, setIsFollowedUsersModalOpen] =
    useState(false);

  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (targetId && cardRefs.current[targetId]) {
      setTimeout(() => {
        cardRefs.current[targetId]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 100);
    }
  }, [targetId, checkIns]);

  useEffect(() => {
    const fetchCheckIns = async () => {
      if (!user) return;
      try {
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
                  ? item.likes.filter((like) => like.userId !== user?.id!)
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

  useEffect(() => {
    const fetchFollowers = async () => {
      if (!user) return;
      try {
        const response = await agent.Follower.getFollowers(userId!);
        setFollowers(response);
      } catch (error) {
        console.error('Greška prilikom preuzimanja followera:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [userId]);

  useEffect(() => {
    const fetchFollowedUsers = async () => {
      try {
        const response = await agent.Follower.getFollowedUsers(userId!);
        setFollowedUsers(response);
      } catch (error) {
        console.error('Greška prilikom preuzimanja followera:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowedUsers();
  }, [userId]);

  const handleFollowersClick = () => {
    setIsFollowersModalOpen(true);
  };

  const handleCloseFollowersModal = () => {
    setIsFollowersModalOpen(false);
  };

  const handleFollowedUsersClick = () => {
    setIsFollowedUsersModalOpen(true);
  };

  const handleCloseFollowedUsersModal = () => {
    setIsFollowedUsersModalOpen(false);
  };

  if (!user) return <UserNotLoggedIn />;

  if (!loading)
    return (
      <>
        <Breadcrumb pageName="Profile" />

        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="relative z-20 h-35 md:h-65">
            <img
              src={Cover}
              alt="profile cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            />
          </div>
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative z-30 mx-auto -mt-22 h-44 w-44 max-w-44 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:w-44 sm:max-w-44 sm:p-3">
              <div className="relative drop-shadow-2 aspect-w-1 aspect-h-1">
                <img
                  src={user?.profilePictureUrl}
                  alt="profile"
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
            </div>

            <p>{user?.userName}</p>
            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white capitalize">
                {user?.firstName} {user?.lastName}
              </h3>

              <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                <div
                  onClick={() => navigate('/my-check-ins')}
                  className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row cursor-pointer"
                >
                  <span className="font-semibold text-black dark:text-white">
                    {checkIns.length}
                  </span>
                  <span className="text-sm">Check Ins</span>
                </div>
                <div
                  onClick={handleFollowersClick}
                  className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row cursor-pointer"
                >
                  <span className="font-semibold text-black dark:text-white">
                    {followers.length}
                  </span>
                  <span className="text-sm">Followers</span>
                </div>
                <div
                  onClick={handleFollowedUsersClick}
                  className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row cursor-pointer"
                >
                  <span className="font-semibold text-black dark:text-white">
                    {followedUsers.length}
                  </span>
                  <span className="text-sm">Following</span>
                </div>
              </div>
            </div>
          </div>
          {isFollowersModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Following</h2>
                <ul className="space-y-4">
                  {followers.map((follower) => (
                    <li
                      key={follower.id}
                      className="flex items-center justify-between p-4 border-b border-stroke last:border-b-0"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={follower.profilePictureUrl}
                          alt={`${follower.firstName}'s profile`}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                          <span className="font-semibold text-black dark:text-white">
                            {follower.userName}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {follower.firstName} {follower.lastName}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={async () => {
                          await agent.Follower.removeFollower(
                            user?.id,
                            follower.id,
                          );
                          alert('Follower removed successfully');
                          window.location.reload();
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleCloseFollowersModal}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </div>
          )}
          {isFollowedUsersModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Following</h2>
                <ul className="space-y-4">
                  {followedUsers.map((followedUser) => (
                    <li
                      key={followedUser.id}
                      className="flex items-center justify-between p-4 border-b border-stroke last:border-b-0"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={followedUser.profilePictureUrl}
                          alt={`${followedUser.firstName}'s profile`}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                          <span className="font-semibold text-black dark:text-white">
                            {followedUser.userName}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {followedUser.firstName} {followedUser.lastName}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={async () => {
                          await agent.Follower.unfollowUser(
                            user?.id,
                            followedUser.id,
                          );
                          alert('User unfollowed successfully');
                          window.location.reload();
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        Unfollow
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleCloseFollowedUsersModal}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </div>
          )}
          <div className="flex flex-col items-center space-y-20 p-8">
            {checkIns.map((checkIn) => (
              <div
                key={checkIn.id}
                ref={(el) => (cardRefs.current[checkIn.id] = el)}
              >
                <CheckInPost checkIn={checkIn} toggleLike={toggleLike} />
              </div>
            ))}
          </div>
        </div>
      </>
    );
};

export default Profile;
