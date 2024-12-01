const ProfileStats = ({
  checkInsCount,
  followersCount,
  followedUsersCount,
  onFollowersClick,
  onFollowedUsersClick,
}: {
  checkInsCount: number;
  followersCount: number;
  followedUsersCount: number;
  onFollowersClick: () => void;
  onFollowedUsersClick: () => void;
}) => (
  <div className="mt-4">
    <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
      <div
        onClick={onFollowersClick}
        className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row cursor-pointer"
      >
        <span className="font-semibold text-black dark:text-white">
          {followersCount}
        </span>
        <span className="text-sm">Followers</span>
      </div>
      <div
        onClick={onFollowedUsersClick}
        className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row cursor-pointer"
      >
        <span className="font-semibold text-black dark:text-white">
          {followedUsersCount}
        </span>
        <span className="text-sm">Following</span>
      </div>
      <div
        onClick={() => {}}
        className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row cursor-pointer"
      >
        <span className="font-semibold text-black dark:text-white">
          {checkInsCount}
        </span>
        <span className="text-sm">Check Ins</span>
      </div>
    </div>
  </div>
);

export default ProfileStats;
