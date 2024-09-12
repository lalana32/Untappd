using backend.Models;
using backend.Services.Beers;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BeersController : ControllerBase
    {
        private readonly IBeerService _beerService;

        public BeersController(IBeerService beerService)
        {
            _beerService = beerService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Beer>>> GetAllBeers()
        {
            var beers = await _beerService.GetAllBeers();
            return Ok(beers);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Beer>> GetBeerById(int id)
        {
            var beer = await _beerService.GetBeerById(id);

            if (beer == null)
            {
                return NotFound();
            }

            return Ok(beer);
        }

        [HttpPost]
        public async Task<ActionResult<Beer>> AddBeer([FromBody] Beer beer)
        {
            if (beer == null)
            {
                return BadRequest("Beer object is null.");
            }

            var createdBeer = await _beerService.AddBeer(beer);
            return CreatedAtAction(nameof(GetBeerById), new { id = createdBeer.Id }, createdBeer);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditBeer(int id, [FromBody] Beer beer)
        {
            if (id != beer.Id)
            {
                return BadRequest("Beer ID mismatch.");
            }

            await _beerService.UpdateBeer(beer);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBeer(int id)
        {
            await _beerService.DeleteBeer(id);
            return NoContent();
        }
    }
}
