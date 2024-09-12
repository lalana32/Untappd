using backend.DTOs.User;

namespace backend.Services.Auth
{
    public interface IAuthService
    {
        Task<UserDTO> Login(LoginUserDTO loginDto);
        Task<UserDTO> Register(RegisterUserDTO registerDto);
        Task<List<UserDTO>> GetAllUsers();
        Task<UserDTO> GetUserById(string id);
        
    }
}