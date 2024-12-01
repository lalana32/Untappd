using Microsoft.AspNetCore.Mvc;
using backend.DTOs.CheckIn;
using backend.Services;
using System.Security.Claims;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CheckInController : ControllerBase
    {
        private readonly ICheckInService _checkInService;

        public CheckInController(ICheckInService checkInService)
        {
            _checkInService = checkInService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCheckIn(int id)
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var checkIn = await _checkInService.GetCheckInById(id, currentUserId!);
            if (checkIn == null)
            {
                return NotFound();
            }

            return Ok(checkIn);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCheckIns()
        {
            var checkIns = await _checkInService.GetAllCheckIn();
            return Ok(checkIns);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetCheckInsByUserId(string userId, string sort = "date_desc", string country = null!)
        {
            var checkIns = await _checkInService.GetCheckInsByUserId(userId, sort, country);
            return Ok(checkIns);
        }


        

        [HttpGet("feed/{userId}")]
        public async Task<IActionResult> GetFeedCheckIns(string userId)
        {
    
                var checkIns = await _checkInService.GetFeedCheckIns(userId);

                return Ok(checkIns);
        }
            
        

      
        [HttpPost("createCheckIn")]
            public async Task<IActionResult> CreateCheckIn( CreateCheckInDTO createCheckInDTO)
            {
                await _checkInService.CreateCheckIn(createCheckInDTO);
                return CreatedAtAction(nameof(GetCheckIn), new { id = createCheckInDTO.BeerId }, createCheckInDTO);
            }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCheckIn(int id, [FromBody] UpdateCheckinDTO updateCheckinDTO)
        {
            if (id != updateCheckinDTO.Id)
            {
                return BadRequest();
            }

            await _checkInService.UpdateCheckIn(updateCheckinDTO);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCheckIn(int id)
        {
            await _checkInService.DeleteCheckIn(id);
            return NoContent();
        }
    }
}
