import { useState, useEffect } from 'react';
import { useAppSelector } from '../../configureStore';
import agent from '../../data/agent';
import { CheckInDTO } from '../../models/checkIn';
import Loader from '../../common/Loader';
import UserNotLoggedIn from '../UserNotLoggedIn';
import NoCheckInsYet from '../NoCheckInsYet';

const Table = () => {
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.id;
  const [checkIns, setCheckIns] = useState<CheckInDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [allCountries, setAllCountries] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  useEffect(() => {
    const fetchCheckIns = async () => {
      try {
        const response = await agent.CheckIns.getCheckInsByUserId(
          user?.id!,
          sort,
          selectedCountry,
        );
        const checkIns = response as CheckInDTO[];
        setCheckIns(checkIns);

        if (allCountries.length === 0) {
          const countries = checkIns.map(
            (checkIn: CheckInDTO) => checkIn.country,
          );
          const uniqueCountries = [...new Set(countries)];
          setAllCountries(uniqueCountries);
          setCountries(uniqueCountries);
        }
      } catch (error) {
        console.error('Error fetching check-ins:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckIns();
  }, [userId, selectedCountry, sort]);

  const handleFilterChange = (selected: string) => {
    setSelectedCountry(selected);
    if (selected === '') {
      setCountries(allCountries);
    }
  };

  const handleSortChange = (selected: string) => {
    setSort(selected);
  };

  if (!user) return <UserNotLoggedIn />;

  if (loading) return <Loader />;

  if (checkIns.length === 0) {
    return <NoCheckInsYet />;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          My Check Ins
        </h4>
      </div>

      {/* Sort and Filter section */}
      <div className="flex justify-between border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:px-6 2xl:px-7.5">
        {/* Sort By */}
        <div className="flex items-center">
          <label
            htmlFor="sort"
            className="font-medium text-black dark:text-white"
          >
            Sort By:
          </label>
          <select
            id="sort"
            className="ml-2 p-2 rounded border border-stroke dark:border-strokedark dark:bg-boxdark dark:text-white"
            value={sort}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="date_desc">Date (Newest)</option>
            <option value="date_asc">Date (Oldest)</option>
            <option value="rating_desc">Rating (Highest)</option>
            <option value="rating_asc">Rating (Lowest)</option>
          </select>
        </div>

        {/* Filter By Country */}
        <div className="flex items-center">
          <label
            htmlFor="country"
            className="font-medium text-black dark:text-white"
          >
            Filter By Country:
          </label>
          <select
            id="country"
            className="ml-2 p-2 rounded border border-stroke dark:border-strokedark dark:bg-boxdark dark:text-white"
            value={selectedCountry}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="">All Countries</option>
            {countries.map((country, index) => (
              <option key={index} value={`${country}`}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Check-ins list */}
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
