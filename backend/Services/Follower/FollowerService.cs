using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Follower
{
    public class FollowerService : IFollowerService
    {
        private readonly UserManager<User> _userManager;
        private readonly DataContext _context;

        public FollowerService(UserManager<User> userManager, DataContext context)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task FollowUser(string currentUserId, string userToFollowId)
        {
            var currentUser = await _userManager.FindByIdAsync(currentUserId);
            var userToFollow = await _userManager.FindByIdAsync(userToFollowId);

            if (currentUser == null || userToFollow == null)
            {
                throw new Exception("User not found");
            }

            if (currentUser.FollowedUsers.Contains(userToFollow))
            {
                throw new Exception("Already following this user");
            }

            currentUser.FollowedUsers.Add(userToFollow);
            userToFollow.Followers.Add(currentUser);

            var notification = new Notification
            {
                UserId = userToFollow.Id, 
                Message = $"{currentUser.UserName} started following you", 
                IsRead = false, 
                CreatedAt = DateTime.UtcNow,
                InteractingUserId = currentUserId,
                Type = NotificationType.Follow
            };

            _context.Notifications.Add(notification);

            await _userManager.UpdateAsync(currentUser);
            await _userManager.UpdateAsync(userToFollow);
        }

        public async Task UnfollowUser(string currentUserId, string userToUnfollowId)
        {
            try
            {
           
                var currentUser = await _userManager.Users
                    .Include(u => u.FollowedUsers)
                    .FirstOrDefaultAsync(u => u.Id == currentUserId);

                var userToUnfollow = await _userManager.Users
                    .Include(u => u.Followers)
                    .FirstOrDefaultAsync(u => u.Id == userToUnfollowId);

                if (currentUser == null || userToUnfollow == null)
                {
                    throw new Exception("User not found.");
                }

             
                currentUser.FollowedUsers.Remove(userToUnfollow);
                userToUnfollow.Followers.Remove(currentUser);

             
                await _context.SaveChangesAsync();

               
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }





        public async Task RemoveFollower(string currentUserId, string userToRemoveId)
        {
            try
            {
               
                var currentUser = await _userManager.Users
                    .Include(u => u.Followers)
                    .FirstOrDefaultAsync(u => u.Id == currentUserId);

                var userToRemove = await _userManager.Users
                    .Include(u => u.FollowedUsers)
                    .FirstOrDefaultAsync(u => u.Id == userToRemoveId);

                if (currentUser == null || userToRemoveId == null)
                {
                    throw new Exception("User not found.");
                }

                currentUser.Followers.Remove(userToRemove!);
                userToRemove!.FollowedUsers.Remove(currentUser);

           
                await _context.SaveChangesAsync();

               
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }





        public async Task<List<FollowerDTO>> GetFollowedUsers(string currentUserId)
        {
            var currentUser = await _userManager.Users
                .Include(u => u.FollowedUsers)
                .FirstOrDefaultAsync(u => u.Id == currentUserId);
            if (currentUser == null)
            {
                throw new Exception("User not found");
            }

    
        var followedUsers = currentUser.FollowedUsers
        .Select(u => new FollowerDTO
        {
            Id = u.Id,
            UserName = u.UserName!,
            FirstName = u.FirstName,
            LastName = u.LastName,
            ProfilePictureUrl = u.ProfilePictureUrl,
        })
        .ToList();

        return followedUsers;
        }

        public async Task<List<FollowerDTO>> GetFollowers(string currentUserId)
        {
            var currentUser = await _userManager.Users
                .Include(u => u.Followers)
                .FirstOrDefaultAsync(u => u.Id == currentUserId);

            if (currentUser == null)
            {
                throw new Exception("User not found");
            }

            var followers = currentUser.Followers
            .Select(u => new FollowerDTO
            {
                Id = u.Id,
                UserName = u.UserName!,
                FirstName = u.FirstName,
                LastName = u.LastName,
                ProfilePictureUrl = u.ProfilePictureUrl,
            })
            .ToList();

            return followers;
        }
    }
}
