using backend.Models;

namespace backend.Services.Beers
{
    public interface IBeerService
    {
        Task<List<Beer>> GetAllBeers();
        Task<Beer> GetBeerById(int id);
        Task<Beer> AddBeer(Beer beer);
        Task UpdateBeer(Beer beer);
        Task DeleteBeer(int id);
    }
}