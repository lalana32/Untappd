using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.Comments;
using backend.Models;

namespace backend.DTOs.CheckIn
{
    public class GetCheckInDTO
    {
         public int Id { get; set; }
        public int BeerId { get; set; }
        public string BeerName { get; set; }
        public string Brewery { get; set; }
        public decimal Rating { get; set; }
        public string? Notes { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public string UserId { get; set; }
        public string FirstName { get; set; } 
        public string LastName { get; set; } 
        public string BeerImageUrl { get; set; }
        public string Country { get; set;}
        public ICollection<Like> Likes {get; set;}
        public bool IsLikedByCurrentUser {get; set;}
        public ICollection<GetCommentDTO> Comments {get; set;}
        
    }
}