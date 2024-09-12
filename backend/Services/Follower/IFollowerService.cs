using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services.Follower
{
    public interface IFollowerService
    {
        Task FollowUser(string currentUserId, string userToFollowId);
        Task UnfollowUser(string currentUserId, string userToUnfollowId);
        Task RemoveFollower(string currentUserId, string userToRemoveId);
        Task<List<FollowerDTO>> GetFollowedUsers(string currentUserId);
        Task<List<FollowerDTO>> GetFollowers(string currentUserId);
    }
}
