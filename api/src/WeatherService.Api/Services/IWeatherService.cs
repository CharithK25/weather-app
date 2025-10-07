using WeatherService.Api.Dtos;

namespace WeatherService.Api.Services;

public interface IWeatherService
{
    Task<WeatherResultDto> GetWeatherAsync(string city, CancellationToken ct);
    Task<List<HistoricWeatherDto>> GetHistoricWeatherAsync(string city, int days, CancellationToken ct);

}
