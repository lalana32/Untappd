namespace backend.DTOs.CheckIn
{
    public class CreateCheckInDTO
    {
       
        public int BeerId { get; set; }
        
        public decimal Rating { get; set; }

        public string? Notes { get; set; }

        public DateTime Date { get; set; } = DateTime.UtcNow;
        public string UserId {  get; set; }

    }
}