namespace WeatherService.Api.WeatherApi;

public interface IWeatherApiClient
{
    Task<CurrentRoot> GetCurrentAsync(string city, CancellationToken ct);
    Task<AstronomyRoot> GetAstronomyAsync(string city, DateOnly date, CancellationToken ct);
    Task<HistoryRoot> GetHistoryAsync(string city, DateOnly date, CancellationToken ct);


}
