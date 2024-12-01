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
        public async Task<IActionResult> Login([FromBody] LoginUserDTO loginDto)
        {
            try
            {
                var user = await _authService.Login(loginDto);
                return Ok(user); 
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred. Please try again." });
            }
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


         [HttpGet("getCurrentUser")]
        public async Task<IActionResult> GetCurrentUser()
        {
            try
            {
                var userDto = await _authService.GetCurrentUser();
                return Ok(userDto);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }


    }
}