namespace backend.DTOs.User
{
    public class LoginUserDTO
    {
        public required string UserName { get; set; }
        public required string Password { get; set; }
    }
}