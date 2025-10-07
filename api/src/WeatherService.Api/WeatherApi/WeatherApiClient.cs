using System.Net.Http.Json;
using Microsoft.Extensions.Options;

namespace WeatherService.Api.WeatherApi;

public sealed class WeatherApiOptions
{
    public string BaseUrl { get; set; } = "https://api.weatherapi.com/v1/";
    public string ApiKey { get; set; } = "";
}

public sealed class WeatherApiClient(HttpClient http, IOptions<WeatherApiOptions> opt) : IWeatherApiClient
{
    private readonly HttpClient _http = http;
    private readonly WeatherApiOptions _opt = opt.Value;

    public async Task<CurrentRoot> GetCurrentAsync(string city, CancellationToken ct)
    {
        var url = $"current.json?key={ApiKey()}&q={Uri.EscapeDataString(city)}";
        return await _http.GetFromJsonAsync<CurrentRoot>(url, ct)
               ?? throw new InvalidOperationException("Invalid current.json response");
    }

    public async Task<AstronomyRoot> GetAstronomyAsync(string city, DateOnly date, CancellationToken ct)
    {
        var url = $"astronomy.json?key={ApiKey()}&q={Uri.EscapeDataString(city)}&dt={date:yyyy-MM-dd}";
        return await _http.GetFromJsonAsync<AstronomyRoot>(url, ct)
               ?? throw new InvalidOperationException("Invalid astronomy.json response");
    }

    private string ApiKey()
        => Environment.GetEnvironmentVariable("WEATHERAPI_KEY")
           ?? _opt.ApiKey
           ?? throw new InvalidOperationException("WeatherAPI key not configured");

    public async Task<HistoryRoot> GetHistoryAsync(string city, DateOnly date, CancellationToken ct)
    {
        var url = $"history.json?key={ApiKey()}&q={Uri.EscapeDataString(city)}&dt={date:yyyy-MM-dd}";
        return await _http.GetFromJsonAsync<HistoryRoot>(url, ct)
               ?? throw new InvalidOperationException("Malformed history.json response");
    }

}
