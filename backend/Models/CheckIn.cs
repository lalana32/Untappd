namespace backend.Models
{
    public class CheckIn
    {
        public int Id { get; set; } 
        public int BeerId { get; set; }
        public virtual Beer Beer { get; set; }
        public required decimal Rating { get; set; }
        public string Brewery { get; set; }
        public string? Notes { get; set; } 
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public ICollection<Like> Likes { get; set; }
        public ICollection<Comment> Comments {get; set;}
    }
}