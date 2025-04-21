using Microsoft.AspNetCore.Mvc;
using TripGuide.Api.Services.DeepSeek;

namespace TripGuide.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeepSeekController : ControllerBase
    {
        private readonly IDeepSeekClient _deepSeekClient;

        public DeepSeekController(IDeepSeekClient deepSeekClient)
        {
            _deepSeekClient = deepSeekClient;
        }

        [HttpPost]
        public async Task<IActionResult> Post(
            [FromBody] string message, 
            CancellationToken ct)
        {
            var result = await _deepSeekClient.SendMessageAsync(message, ct);
            if (!result.Success)
            {
                return StatusCode(502, new { error = result.Message });
            }                

            return Ok(new { reply = result.Message });
        }
    }
}
