using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Services.Likes
{
    public interface ILikeService
    {
        Task<bool> ToggleLike(int checkInId, string userId); 
        Task<bool> IsLiked(int checkInId, string userId);
        Task<List<Like>> GetLikes();
        Task<List<Like>> GetLikesByCheckInId(int checkInId);
    }
}