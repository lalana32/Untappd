using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.DTOs.Comments;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Comments
{
    public class CommentService : ICommentService
    {
        private readonly DataContext _context;

    public CommentService(DataContext context)
    {
        _context = context;
    }

 
    public async Task<Comment> AddCommentAsync(AddCommentDTO dto)
{
    var checkIn = await _context.CheckIns.FindAsync(dto.CheckInId);
    if (checkIn == null)
    {
        throw new Exception("CheckIn not found.");
    }

    var comment = new Comment
    {
        CheckInId = dto.CheckInId,
        UserId = dto.UserId,  // Koristi prosleđeni userId
        Text = dto.Text,
        CreatedAt = DateTime.UtcNow
    };

    _context.Comments.Add(comment);
    await _context.SaveChangesAsync();

    return comment;
}



  
    public async Task<bool> DeleteCommentAsync(int commentId, string userId)
    {
        var comment = await _context.Comments
            .FirstOrDefaultAsync(c => c.Id == commentId && c.UserId == userId);

        if (comment == null)
        {
            return false;
        }

        _context.Comments.Remove(comment);
        await _context.SaveChangesAsync();
        return true;
    }

   
   public async Task<List<GetCommentDTO>> GetCommentsByCheckInAsync(int checkInId)
{
    var comments = await _context.Comments
        .Where(c => c.CheckInId == checkInId)
        .Select(c => new GetCommentDTO
        {
            Text = c.Text,
            UserId = c.UserId,
            CreatedAt = c.CreatedAt,
            CheckInId = c.CheckInId
        })
        .ToListAsync();

    return comments;
}

    }
}