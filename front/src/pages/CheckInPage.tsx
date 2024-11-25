import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import agent from '../data/agent';
import { useAppSelector } from '../configureStore';

const CheckInPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { beerId } = location.state as { beerId: number };

  const [beer, setBeer] = useState<{ imageUrl: string; name: string } | null>(
    null,
  );
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');

  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchBeer = async () => {
      try {
        const fetchedBeer = await agent.Beers.getBeerById(beerId);
        setBeer(fetchedBeer);
        console.log(fetchedBeer);
      } catch (error) {
        console.error('Failed to fetch beer:', error);
      }
    };

    fetchBeer();
  }, [beerId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const data = {
        beerId: beerId,
        rating: rating,
        notes: notes,
        date: new Date().toISOString(),
        userId: user?.id,
      };
      console.log(user?.id);
      const response = await agent.CheckIns.createCheckIn(data);
      console.log(response);
      navigate('/my-check-ins');
    } catch (error) {
      console.error('Check-in failed:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Check In</h1>

      {beer ? (
        <div className="mb-4">
          <img
            src={beer.imageUrl}
            alt={beer.name}
            className="w-full h-48 object-contain mb-2"
          />
          <h2 className="text-xl font-semibold">{beer.name}</h2>
        </div>
      ) : (
        <p>Loading beer details...</p>
      )}

      <div className="mb-6">
        <label htmlFor="rating" className="block text-gray-700 mb-2">
          Rate this beer:
        </label>
        <input
          id="rating"
          type="range"
          min="0"
          max="5"
          step="0.25"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          style={{
            WebkitAppearance: 'none', // Uklanja default stil za WebKit pretraživače
          }}
        />
        <div className="text-center mt-2">
          <span className="text-lg font-semibold text-gray-800 ">
            Rating: {rating}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Comment:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
        >
          Submit Check-In
        </button>
      </form>
    </div>
  );
};

export default CheckInPage;
