namespace backend.Models
{
    public class Notification
    {

    public int Id { get; set; }
    public string Message { get; set; }
    public bool IsRead { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string UserId { get; set; }
    public User User { get; set; }
    public string InteractingUserId  { get; set; }
    public int? PostId { get; set; }  
    public NotificationType Type { get; set; }  
    }

     
}
