import { Link } from 'react-router-dom';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';

import { useEffect, useState } from 'react';
import agent from '../../data/agent';
import { User } from '../../models/user';
import { useAppSelector } from '../../configureStore';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const currentUser = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await agent.Auth.getUsers();
        setUsers(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const filteredResults = users.filter(
      (user) =>
        user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.firstName + ' ' + user.lastName)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
    );
    setSearchResults(filteredResults);
  }, [searchTerm, users]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>
        </div>

        <div className="block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search for users..."
                className={`w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125
                 ${!currentUser ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!currentUser}
                title={!currentUser ? 'You are not logged in' : ''}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }}
              />
              {searchTerm && (
                <div className="absolute left-0 top-full mt-2 w-full bg-white border border-gray-200 shadow-lg dark:bg-boxdark dark:border-strokedark">
                  {loading ? (
                    <div className="p-4 text-center text-gray-500 dark:text-white">
                      Loading...
                    </div>
                  ) : searchResults.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 dark:text-white">
                      No results found
                    </div>
                  ) : (
                    <ul>
                      {searchResults.map((searchResult: User) => (
                        <Link
                          to={`/users/${searchResult.id}`}
                          className="flex items-center w-full"
                          onClick={() => setSearchTerm('')}
                        >
                          <li
                            key={searchResult.id}
                            className="flex items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            <img
                              src={
                                searchResult.profilePictureUrl ||
                                '/path/to/default-avatar.png'
                              }
                              alt={`${searchResult.userName}'s profile`}
                              className="w-12 h-12 rounded-full mr-3 object-cover"
                            />
                            <div className="flex flex-col">
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {searchResult.userName}
                              </span>
                              <span className="text-gray-600 dark:text-gray-400 text-sm">
                                {searchResult.firstName} {searchResult.lastName}
                              </span>
                            </div>
                          </li>
                        </Link>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </form>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DropdownNotification />
          </ul>

          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
