using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Comment
    {
       
        public int Id { get; set; } 

        public string? Text { get; set; } 
      
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int CheckInId { get; set; } 

        public CheckIn? CheckIn { get; set; } 

        public string? UserId { get; set; } 

        public User? User { get; set; } 

    }
}