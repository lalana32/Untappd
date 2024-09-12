using AutoMapper;
using backend.DTOs.User;
using backend.Models;
using backend.Services.Auth;
using Microsoft.AspNetCore.Identity;

namespace backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
      
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;

        public AuthService(UserManager<User> userManager, TokenService tokenService,
        IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            _userManager = userManager;
            _tokenService = tokenService;
      
            _httpContextAccessor = httpContextAccessor;
            _mapper = mapper;
        }

        public async Task<UserDTO> Login(LoginUserDTO loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.UserName);

            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                throw new UnauthorizedAccessException("Invalid credentials");
            }

            var roles = await _userManager.GetRolesAsync(user);

            return new UserDTO
            {
                Id = user.Id,
                UserName = user.UserName!,
                Token = _tokenService.CreateToken(user, roles),
                FirstName = user.FirstName,
                LastName = user.LastName,
                ProfilePictureUrl = user.ProfilePictureUrl,
                Email = user.Email!,
            };
        }

       

        public async Task<UserDTO> Register( RegisterUserDTO registerDto)
        {

            if (registerDto.ProfilePicture != null && registerDto.ProfilePicture.Length > 0)
            {
                var folderPath = Path.Combine("wwwroot", "images");
                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(registerDto.ProfilePicture.FileName);
                var filePath = Path.Combine(folderPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await registerDto.ProfilePicture.CopyToAsync(stream);
                }
                var user = _mapper.Map<UserDTO>(registerDto);

                var request = _httpContextAccessor.HttpContext?.Request;
                var baseUrl = $"{request?.Scheme}://{request?.Host}{request?.PathBase}";
                
                user.ProfilePictureUrl = Path.Combine(baseUrl, "images", fileName).Replace("\\", "/");


                    var newUser = new User
                {
                    UserName = registerDto.UserName,
                    Email = registerDto.Email,
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName,
                    ProfilePictureUrl = user.ProfilePictureUrl,

                };


            var result = await _userManager.CreateAsync(newUser, registerDto.Password);

            if (!result.Succeeded) return null;

            await _userManager.AddToRoleAsync(newUser, "Member");

            var roles = await _userManager.GetRolesAsync(newUser);

            return new UserDTO
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(newUser, roles),
                Id = user.Id,
                ProfilePictureUrl = user.ProfilePictureUrl,
                Email = user.Email,
            };


            }

            return null;
            
        }

       public async Task<List<UserDTO>> GetAllUsers()
       {
           var users =  _userManager.Users.ToList();

           var mappedUsers = users.Select(user => _mapper.Map<UserDTO>(user)).ToList();

           return mappedUsers;
       }


        public async Task<UserDTO> GetUserById(string id)
        {
            
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
            
                throw new KeyNotFoundException("User not found");
            }

            var userDto = _mapper.Map<UserDTO>(user);

            return userDto;
        }

        



    }
}
