using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.DTOs.Comments;
using backend.Models;
using backend.Services.Comments;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;
        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }


        [HttpPost("addComment")]
        public async Task<ActionResult<Comment>> AddComment(AddCommentDTO dto)
        {
            
            if (string.IsNullOrEmpty(dto.Text))
            {
                return BadRequest("Text is required for comment.");
            }

            try
            {
              
                var comment = await _commentService.AddCommentAsync(dto);

       
                return CreatedAtAction(nameof(GetCommentsByCheckIn), new { checkInId = dto.CheckInId }, comment);
            }
            catch (Exception ex)
            {
                return NotFound($"CheckIn not found: {ex.Message}");
            }
        }

       
        [HttpDelete("deleteComment")]
       
        public async Task<ActionResult<List<Comment>>> DeleteComment(int commentId, string userId)
        {
           

            var deletedComment = await _commentService.DeleteCommentAsync(commentId, userId);

            return Ok(deletedComment); 
        }

       
        [HttpGet("{checkInId}")]
        public async Task<ActionResult<List<Comment>>> GetCommentsByCheckIn(int checkInId)
        {
            var comments = await _commentService.GetCommentsByCheckInAsync(checkInId);

            if (comments == null || comments.Count == 0)
            {
                return NotFound("No comments found for this CheckIn.");
            }

            return Ok(comments);
        }

      
    }
}