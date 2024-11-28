using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Likes
{
    public class LikeService : ILikeService
    {
        private readonly DataContext _context;

        public LikeService(DataContext context)
        {
            _context = context;
        }

        
        public async Task<List<Like>> GetLikes()
        {
            var likes = await _context.Likes.ToListAsync();
            return likes;
        }
        

       public async Task<bool> ToggleLike(int checkInId, string userId)
       {   

            var currentUser = await _context.Users.FindAsync(userId);
            

            var checkIn = await _context.CheckIns.FirstOrDefaultAsync(c => c.Id == checkInId);
            if (checkIn == null) return false;

            var checkInUserId = checkIn.UserId;

            var like = await _context.Likes.FirstOrDefaultAsync(l => l.CheckInId == checkInId && l.UserId == userId);

            if (like != null)
            {
                _context.Likes.Remove(like);
                await _context.SaveChangesAsync();
                return false;
            }
            else
            {
                var newLike = new Like { CheckInId = checkInId, UserId = userId };
                var notification = new Notification 
                {
                    UserId = checkInUserId,
                    Message = $"{currentUser!.UserName} liked your check in", 
                    IsRead = false, 
                    CreatedAt = DateTime.UtcNow,
                    InteractingUserId = currentUser.Id,
                    Type = NotificationType.Like,
                    PostId = checkInId
                };
                _context.Notifications.Add(notification);
                _context.Likes.Add(newLike);
                await _context.SaveChangesAsync();
                return true;
            }
        }


        public async Task<bool> IsLiked(int checkInId, string userId)
        {
            var like = await _context.Likes.FirstOrDefaultAsync(l => l.CheckInId == checkInId && l.UserId == userId);

            bool isLiked = like != null;

            return isLiked;
        }

        public async Task<List<Like>> GetLikesByCheckInId(int checkInId)
        {
            var likes = await _context.Likes.Where(l => l.CheckInId == checkInId).ToListAsync();
            return likes;
        }
    }
}