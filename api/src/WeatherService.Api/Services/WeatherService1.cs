using WeatherService.Api.Dtos;
using WeatherService.Api.WeatherApi;

namespace WeatherService.Api.Services;

public sealed class WeatherService1(IWeatherApiClient client) : IWeatherService
{
    public async Task<WeatherResultDto> GetWeatherAsync(string city, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(city))
            throw new ArgumentException("City name is required");

        var current = await client.GetCurrentAsync(city, ct);
        var localTime = DateTime.Parse(current.Location.Localtime);

        var astronomy = await client.GetAstronomyAsync(current.Location.Name, DateOnly.FromDateTime(localTime), ct);
        var astro = await client.GetAstronomyAsync(current.Location.Name, DateOnly.FromDateTime(localTime), ct);


        return new WeatherResultDto(
    City: current.Location.Name,
    Region: current.Location.Region,
    Country: current.Location.Country,
    LocalTime: localTime,
    Temperature: current.Current.Temp_c,
    Sunrise: astro.Astronomy.Astro.Sunrise,
    Sunset: astro.Astronomy.Astro.Sunset,
    Latitude: current.Location.Lat,
    Longitude: current.Location.Lon
);

    }

    public async Task<List<HistoricWeatherDto>> GetHistoricWeatherAsync(string city, int days, CancellationToken ct)
    {
        if (days <= 0 || days > 7)
            throw new ArgumentException("Days must be between 1 and 7 for free API plan.");

        var results = new List<HistoricWeatherDto>();
        var today = DateOnly.FromDateTime(DateTime.UtcNow);

        for (int i = 0; i < days; i++)
        {
            var date = today.AddDays(-i);
            var history = await client.GetHistoryAsync(city, date, ct);
            var forecastDay = history.Forecast.Forecastday.First();

            results.Add(new HistoricWeatherDto(
                forecastDay.Date,
                forecastDay.Day.Avgtemp_c,
                forecastDay.Day.Maxtemp_c,
                forecastDay.Day.Mintemp_c
            ));

        }

        return results.OrderBy(r => r.Date).ToList();
    }

}
