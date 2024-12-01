using System.Threading.Tasks;
using backend.Services.Likes;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LikeController : ControllerBase
    {
        private readonly ILikeService _likeService;

        public LikeController(ILikeService likeService)
        {
            _likeService = likeService;
        }

       
        [HttpGet]
        public async Task<IActionResult> GetLikes()
        {
            var likes = await _likeService.GetLikes();
            return Ok(likes);
        }

       
       

        [HttpPost("toggle-like")]

        public async Task<IActionResult> ToggleLike([FromBody] Like like)
        {
            if (string.IsNullOrEmpty(like.UserId))
            {
                return Unauthorized("User is not authenticated");
            }

            try
            {
                var isLiked = await _likeService.ToggleLike(like.CheckInId, like.UserId);
                return Ok(isLiked);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

       
        [HttpGet("{checkInId}/isLiked")]
        public async Task<IActionResult> IsLiked(int checkInId, [FromQuery] string userId)
        {
            bool isLiked = await _likeService.IsLiked(checkInId, userId);
            return Ok(new { isLiked });
        }

        [HttpGet("{checkInId}/getLikes")]
        public async Task<IActionResult> GetLikesByCheckInId(int checkInId)
        {
            var likes =  await _likeService.GetLikesByCheckInId(checkInId);
            return Ok(likes);
        }

    }
}
