using Microsoft.AspNetCore.Mvc;
using WeatherService.Api.Dtos;
using WeatherService.Api.Services;

namespace WeatherService.Api.Controllers;

[ApiController]
[Route("api/weather")]
public sealed class WeatherController(IWeatherService service) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(typeof(WeatherResultDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Get([FromQuery] string city, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(city))
            return BadRequest(new ErrorResponse("bad_request", "City is required"));

        try
        {
            var result = await service.GetWeatherAsync(city, ct);
            return Ok(result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new ErrorResponse("bad_request", ex.Message));
        }
    }

    [HttpGet("history")]
    [ProducesResponseType(typeof(List<HistoricWeatherDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetHistory([FromQuery] string city, [FromQuery] int days = 3, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(city))
            return BadRequest(new ErrorResponse("bad_request", "City is required"));

        var result = await service.GetHistoricWeatherAsync(city, days, ct);
        return Ok(result);
    }

}
