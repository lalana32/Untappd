using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.Comments
{
    public class AddCommentDTO
    {
        public string? Text { get; set; } 
        public int CheckInId { get; set; } 
        public string? UserId {get; set; }

    }
}