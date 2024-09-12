using backend.DTOs.User;
using backend.Services.Auth;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
         private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginUserDTO loginDto)
        {
            var user = await _authService.Login(loginDto);
            if (user == null) return Unauthorized("Invalid username or password");

            return Ok(user);
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register([FromForm] RegisterUserDTO registerDto)
        {
            var user = await _authService.Register(registerDto);
            if (user == null) return BadRequest("Problem registering user");

            return Ok(user);
        }

        [HttpGet("getUsers")]
        public async Task<ActionResult<List<UserDTO>>> GetAllUsers()
        {
            var users = await _authService.GetAllUsers();
            return users;
        }


        [HttpGet("getUserById/{id}")]
        public async Task<ActionResult<UserDTO>> GetUserById(string id)
        {
            var users = await _authService.GetUserById(id);
            return users;
        }


        }
    }