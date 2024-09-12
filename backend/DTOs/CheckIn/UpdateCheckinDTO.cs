namespace backend.DTOs.CheckIn
{
    public class UpdateCheckinDTO
    {
        public int Id { get; set; }  
        public int BeerId { get; set; }  
        public decimal Rating { get; set; } 
        public string? Notes { get; set; } 
        public string? UserId { get; set; } 
    }
}