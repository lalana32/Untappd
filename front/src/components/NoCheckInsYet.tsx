import { useNavigate } from 'react-router-dom';
import BeerBotle from '../../public/photos/beer-bottle.png';

const NoCheckInsYet = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50 dark:bg-boxdark">
      <div className="flex flex-col items-center space-y-4">
        <img src={BeerBotle} alt="No Check-ins" className="w-60 h-60" />
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          No Check-ins Yet
        </h2>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          You haven't added any check-ins yet. Start discovering new beers and
          share your experience!
        </p>
        <button
          onClick={() => navigate('/beers')}
          className="mt-6 px-6 py-2 bg-[#fcd34d] hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
        >
          Add Your First Check-In
        </button>
      </div>
    </div>
  );
};

export default NoCheckInsYet;
