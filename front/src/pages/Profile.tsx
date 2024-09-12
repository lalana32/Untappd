import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import Cover from '../../public/photos/cover-photo.jpg';
import { useAppSelector } from '../configureStore';
import { useEffect, useState } from 'react';
import { CheckIn } from '../models/checkIn';
import agent from '../data/agent';
import { Follower } from '../models/follower';
import UserNotLoggedIn from '../components/UserNotLoggedIn';

const Profile = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.id;

  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [followedUsers, setFollowedUsers] = useState<Follower[]>([]);
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isFollowedUsersModalOpen, setIsFollowedUsersModalOpen] =
    useState(false);
  useEffect(() => {
    const fetchCheckIns = async () => {
      if (!user) return;
      try {
        const response = await agent.CheckIns.getCheckInsByUserId(userId!);

        setCheckIns(response);
      } catch (error) {
        console.error('Error fetching check-ins:', error);
      }
    };

    fetchCheckIns();
  }, [userId]);

  useEffect(() => {
    const fetchFollowers = async () => {
      if (!user) return;
      try {
        const response = await agent.Follower.getFollowers(userId!);
        setFollowers(response);
      } catch (error) {
        console.error('Greška prilikom preuzimanja followera:', error);
      } finally {
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
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <img
                src={user?.profilePictureUrl}
                alt="profile"
                className="object-cover h-full w-full rounded-full"
              />
              <label
                htmlFor="profile"
                className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
              >
                <svg
                  className="fill-current"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                    fill=""
                  />
                </svg>
                <input
                  type="file"
                  name="profile"
                  id="profile"
                  className="sr-only"
                />
              </label>
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
      </div>
    </>
  );
};

export default Profile;
