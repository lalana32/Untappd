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
    var userToNotify = await _context.Users.FirstOrDefaultAsync(u => u.CheckIns.Contains(checkIn));
    var userCommented = await _context.Users.FirstOrDefaultAsync(u => u.Id == dto.UserId);

    var notification = new Notification
    {
        UserId = userToNotify.Id,
        Message = $"{userCommented!.UserName} commented your post", 
        IsRead = false, 
        CreatedAt = DateTime.UtcNow,
        InteractingUserId = dto.UserId,
        PostId = checkIn.Id,
        Type = NotificationType.Comment
    };


    

    var comment = new Comment
    {
        CheckInId = dto.CheckInId,
        UserId = dto.UserId,  // Koristi prosleđeni userId
        Text = dto.Text,
        CreatedAt = DateTime.UtcNow
    };

    _context.Comments.Add(comment);
    _context.Notifications.Add(notification);
    await _context.SaveChangesAsync();

    return comment;
}



  
    public async Task<List<Comment>> DeleteCommentAsync(int commentId, string userId)
    {
        var comment = await _context.Comments
            .FirstOrDefaultAsync(c => c.Id == commentId && c.UserId == userId);

        if (comment == null)
        {
            throw new Exception("comment doesnt exist");
        }

        _context.Comments.Remove(comment);
        await _context.SaveChangesAsync();
        var commentList = await _context.Comments.ToListAsync();
        return commentList;
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