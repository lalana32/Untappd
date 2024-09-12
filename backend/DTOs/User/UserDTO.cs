namespace backend.DTOs.User
{
    public class UserDTO
    {
        public string Id { get; set; }
        public string FirstName { get; set;}
        public string LastName { get; set;}
        public string UserName { get; set; }
        public string Token { get; set; }
        public string ProfilePictureUrl { get; set;}
        public string Email { get; set; }

    }
}