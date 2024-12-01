import { Follower } from '../../models/follower';

const FollowerModal = ({
  isOpen,
  followers,
  onClose,
  onRemove,
  title,
}: {
  isOpen: boolean;
  followers: Follower[];
  onClose: () => void;
  onRemove: (id: string) => void;
  title: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
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
                onClick={() => onRemove(follower.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FollowerModal;
