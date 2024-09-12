using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class User : IdentityUser
    {
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string ProfilePictureUrl { get; set; }
        public virtual ICollection<User> FollowedUsers { get; set; } = new HashSet<User>();
        public virtual ICollection<User> Followers { get; set; } = new HashSet<User>();
        public virtual ICollection<CheckIn> CheckIns { get; set; } = new HashSet<CheckIn>();
       
    }
}