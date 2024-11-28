using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.DTOs.Comments;
using backend.Models;

namespace backend.Services.Comments
{
    public interface ICommentService
    {
        // Dodavanje komentara
        Task<Comment> AddCommentAsync(AddCommentDTO dto);

        // Brisanje komentara
        Task<List<Comment>> DeleteCommentAsync(int commentId, string userId);

        // Dohvatanje svih komentara za određeni CheckIn
        Task<List<GetCommentDTO>> GetCommentsByCheckInAsync(int checkInId);
    }
}
