import { User } from '../../models/user';
import Cover from '../../../public/photos/cover-photo.jpg';

const ProfileHeader = ({ user }: { user: User }) => (
  <div className="relative z-20 h-35 md:h-65">
    <img
      src={Cover}
      alt="profile cover"
      className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
    />
    <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
      <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
        <div className="relative drop-shadow-2">
          <img
            src={user.profilePictureUrl}
            alt="profile"
            className="object-cover h-full w-full rounded-full"
          />
        </div>
      </div>
      <p>{user.userName}</p>
      <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white capitalize">
        {user.firstName} {user.lastName}
      </h3>
    </div>
  </div>
);

export default ProfileHeader;
