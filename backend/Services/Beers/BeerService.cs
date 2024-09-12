using backend.Data;
using backend.Models;
using backend.Services.Beers;
using Microsoft.EntityFrameworkCore;

public class BeerService : IBeerService
{
    private readonly DataContext _context;

    public BeerService(DataContext context)
    {
        _context = context;
    }

    public async Task<List<Beer>> GetAllBeers()
    {
        return await _context.Beers.ToListAsync();
    }

    public async Task<Beer> GetBeerById(int id)
    {
    
        var beer = await _context.Beers.FindAsync(id);
        
        if (beer == null)
        {
            throw new KeyNotFoundException("Beer not found.");
        }
        
        return beer;

    }

    public async Task<Beer> AddBeer(Beer beer)
    {
        _context.Beers.Add(beer);
        await _context.SaveChangesAsync();
        return beer;
    }

    public async Task UpdateBeer(Beer beer)
    {
        _context.Entry(beer).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteBeer(int id)
    {
        var beer = await _context.Beers.FindAsync(id);
       
        if (beer == null)
        {
            throw new KeyNotFoundException("Beer not found.");
        }

         _context.Beers.Remove(beer);
         await _context.SaveChangesAsync();
    }
}
