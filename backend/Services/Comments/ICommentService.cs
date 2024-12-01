using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.DTOs.Comments;
using backend.Models;

namespace backend.Services.Comments
{
    public interface ICommentService
    {
        
        Task<Comment> AddCommentAsync(AddCommentDTO dto);

        Task<List<Comment>> DeleteCommentAsync(int commentId, string userId);

        Task<List<GetCommentDTO>> GetCommentsByCheckInAsync(int checkInId);
    }
}
