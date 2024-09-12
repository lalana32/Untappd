using AutoMapper;
using backend.Data;
using backend.DTOs.CheckIn;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class CheckInService : ICheckInService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<User> _userManager;
      

        public CheckInService(DataContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor, UserManager<User> userManager)
        {
            _context = context;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
        }

        public async Task<GetCheckInDTO> GetCheckInById(int id)
        {
            var checkIn = await _context.CheckIns
                .Include(c => c.Beer)
                .Include(c => c.User)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (checkIn == null)
            {
                return null; // Handle not found case
            }

            return new GetCheckInDTO
            {
                Id = checkIn.Id,
                BeerId = checkIn.BeerId,
                BeerName = checkIn.Beer.Name,
                Rating = checkIn.Rating,
                Notes = checkIn.Notes,
                Date = checkIn.Date,
                UserId = checkIn.UserId,
                FirstName = checkIn.User.FirstName,
                LastName = checkIn.User.LastName,
                BeerImageUrl = checkIn.Beer.ImageUrl,
                Brewery = checkIn.Beer.Brewery,
            };
        }

        public async Task<List<GetCheckInDTO>> GetAllCheckIn()
        {
            var checkIns = await _context.CheckIns
                .Include(c => c.Beer)
                .Include(c => c.User)
                .ToListAsync();

            return checkIns.Select(checkIn => new GetCheckInDTO
            {
                Id = checkIn.Id,
                BeerId = checkIn.BeerId,
                BeerName = checkIn.Beer.Name,
                Rating = checkIn.Rating,
                Notes = checkIn.Notes,
                Date = checkIn.Date,
                UserId = checkIn.UserId,
                FirstName = checkIn.User.FirstName,
                LastName = checkIn.User.LastName,
                BeerImageUrl = checkIn.Beer.ImageUrl,
                Brewery = checkIn.Beer.Brewery,
            }).ToList();
        }


        public async Task<List<GetCheckInDTO>> GetCheckInsByUserId(string userId)
        {
            var checkIns = await _context.CheckIns
                .Include(c => c.Beer)
                .Include(c => c.User)
                .Where(c => c.UserId == userId)
                .ToListAsync();

             return checkIns.Select(checkIn => new GetCheckInDTO
            {
                Id = checkIn.Id,
                BeerId = checkIn.BeerId,
                BeerName = checkIn.Beer.Name,
                Rating = checkIn.Rating,
                Notes = checkIn.Notes,
                Date = checkIn.Date,
                UserId = checkIn.UserId,
                FirstName = checkIn.User.FirstName,
                LastName = checkIn.User.LastName,
                BeerImageUrl = checkIn.Beer.ImageUrl,
                Brewery = checkIn.Beer.Brewery,
                Country = checkIn.Beer.Country,
            }).ToList();
        }


        public async Task<List<GetCheckInDTO>> GetFeedCheckIns(string currentUserId)
    {
        
        var currentUser = await _userManager.Users
                .Include(u => u.FollowedUsers)
                .FirstOrDefaultAsync(u => u.Id == currentUserId);
            if (currentUser == null)
            {
                throw new Exception("User not found");
            }

    
         var followedUserIds = currentUser.FollowedUsers.Select(f => f.Id).ToList();
        


      
        var checkIns = await _context.CheckIns
        .Include(c => c.Beer)
        .Include(c => c.User)
        .Where(c => followedUserIds.Contains(c.UserId)) 
        .ToListAsync();

        return checkIns.Select(checkIn => new GetCheckInDTO
        {
            Id = checkIn.Id,
            BeerId = checkIn.BeerId,
            BeerName = checkIn.Beer.Name,
            Rating = checkIn.Rating,
            Notes = checkIn.Notes,
            Date = checkIn.Date,
            UserId = checkIn.UserId,
            FirstName = checkIn.User.FirstName,
            LastName = checkIn.User.LastName,
            BeerImageUrl = checkIn.Beer.ImageUrl,
            Brewery = checkIn.Beer.Brewery,
        }).ToList();
    }


        

        public async Task CreateCheckIn(CreateCheckInDTO createCheckInDTO)
        {
            var beer = await _context.Beers.FindAsync(createCheckInDTO.BeerId);
            if (beer == null)
            {
                throw new Exception("Beer not founded."); 
            }
            
            var checkIn = _mapper.Map<CheckIn>(createCheckInDTO);
            checkIn.UserId = createCheckInDTO.UserId;
            checkIn.Brewery = beer.Brewery;
            
            
        

            _context.CheckIns.Add(checkIn);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateCheckIn(UpdateCheckinDTO updateCheckinDTO)
        {
            var checkIn = await _context.CheckIns
                .Include(c => c.Beer)
                .Include(c => c.User)
                .FirstOrDefaultAsync(c => c.Id == updateCheckinDTO.Id);

            if (checkIn == null)
            {
                return;
            }

            checkIn.BeerId = updateCheckinDTO.BeerId;
            checkIn.Rating = updateCheckinDTO.Rating;
            checkIn.Notes = updateCheckinDTO.Notes;
            checkIn.UserId = updateCheckinDTO.UserId;

            _context.CheckIns.Update(checkIn);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCheckIn(int id)
        {
            var checkIn = await _context.CheckIns.FindAsync(id);

            if (checkIn == null)
            {
                return; 
            }

            _context.CheckIns.Remove(checkIn);
            await _context.SaveChangesAsync();
        }
    }
}
