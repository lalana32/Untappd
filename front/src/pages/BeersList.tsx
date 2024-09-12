import { useState, useEffect } from 'react';
import agent from '../data/agent';
import { Beer } from '../models/beer';
import BeerCard from '../components/BeerCard';

const BeersList = () => {
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    const fetchBeers = async () => {
      try {
        const response = await agent.Beers.getAllBeers();
        setBeers(response);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchBeers();
  }, []);
  return (
    <>
      <div className="container mx-auto px-4 py-8 overflow-x-auto">
        <div className="grid grid-cols-3 gap-8 min-w-[900px]">
          {beers.map((beer: Beer, index) => (
            <BeerCard
              key={index}
              name={beer.name}
              brewery={beer.brewery}
              type={beer.type}
              abv={beer.abv}
              imageUrl={beer.imageUrl}
              beerId={beer.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BeersList;