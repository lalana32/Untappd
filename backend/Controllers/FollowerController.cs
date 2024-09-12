using backend.Services.Follower;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FollowerController : ControllerBase
    {
        private readonly IFollowerService _followerService;

        public FollowerController(IFollowerService followerService)
        {
            _followerService = followerService;
        }

        [HttpGet("followedUsers/{userId}")]
        public async Task<IActionResult> GetFollowedUsers(string userId)
        {
            try
            {
                var followedUsers = await _followerService.GetFollowedUsers(userId);
                if (followedUsers == null || !followedUsers.Any())
                {
                    return NotFound("This user is not following anyone.");
                }

                return Ok(followedUsers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("followers/{userId}")]
        public async Task<IActionResult> GetFollowers(string userId)
        {
            try
            {
                var followers = await _followerService.GetFollowers(userId);
                if (followers == null || !followers.Any())
                {
                    return NotFound("This user has no followers.");
                }

                return Ok(followers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("follow")]
        public async Task<IActionResult> FollowUser(string currentUserId, string userToFollowId)
        {
            try
            {
                await _followerService.FollowUser(currentUserId, userToFollowId);
                return Ok("User followed successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("unfollow")]
        public async Task<IActionResult> UnfollowUser(string currentUserId, string userToUnfollowId)
        {
            try
            {
                await _followerService.UnfollowUser(currentUserId, userToUnfollowId);
                return Ok("User unfollowed successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("removeFollower")]
        public async Task<IActionResult> RemoveFollower(string currentUserId, string userToRemoveId)
        {
            try
            {
                await _followerService.RemoveFollower(currentUserId, userToRemoveId);
                return Ok("Follower removed successfully");   
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, ex.Message);
            }
            
        }
    }
}
