using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.Comments
{
    public class GetCommentDTO
    {
        public int Id { get; set; }
        public string? Text { get; set; } 
        public DateTime CreatedAt { get; set; }
        public int CheckInId { get; set; } 
        public string? UserId {get; set;}
        public string? Username { get; set; }
    }
}