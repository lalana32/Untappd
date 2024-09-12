import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../configureStore';

interface BeerCardProps {
  imageUrl: string;
  name: string;
  brewery: string;
  type: string;
  abv: number;
  beerId: number;
}

const BeerCard = ({
  imageUrl,
  name,
  brewery,
  type,
  abv,
  beerId,
}: BeerCardProps) => {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  const handleCheckInClick = () => {
    navigate('/check-in-page', { state: { beerId } });
    console.log('id piva', beerId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105 hover:shadow-lg">
      <img className="w-full h-48 object-contain" src={imageUrl} alt={name} />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">{name}</h2>
        <p className="text-sm text-gray-500 mb-2">Brewery: {brewery}</p>
        <p className="text-sm text-gray-500 mb-2">Type: {type}</p>
        <p className="text-sm text-gray-500 mb-4">ABV: {abv}%</p>
        <div>
          <button
            disabled={!user}
            title={!user ? 'You are not logged in' : ''}
            className={`bg-green-500 text-white text-sm font-semibold py-2 px-4 rounded transition duration-300 
    ${!user ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
            onClick={handleCheckInClick}
          >
            Check In
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeerCard;
