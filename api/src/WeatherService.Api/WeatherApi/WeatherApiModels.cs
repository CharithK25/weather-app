namespace WeatherService.Api.WeatherApi;

public sealed class CurrentRoot
{
    public required Location Location { get; init; }
    public required Current Current { get; init; }
}



public sealed class Current
{
    public required double Temp_c { get; init; }
}

public sealed class AstronomyRoot
{
    public required Astronomy Astronomy { get; init; }
}

public sealed class Astronomy
{
    public required Astro Astro { get; init; }
}

public sealed class Astro
{
    public required string Sunrise { get; init; }
    public required string Sunset { get; init; }
}

public sealed class HistoryRoot
{
    public required Forecast Forecast { get; init; }
}

public sealed class Forecast
{
    public required List<ForecastDay> Forecastday { get; init; }
}

public sealed class ForecastDay
{
    public required string Date { get; init; }
    public required Day Day { get; init; }
}

public sealed class Day
{
    public required double Avgtemp_c { get; init; }
    public required double Maxtemp_c { get; init; }
    public required double Mintemp_c { get; init; }
}

public sealed class Location
{
    public required string Name { get; init; }
    public required string Region { get; init; }
    public required string Country { get; init; }
    public required string Localtime { get; init; }
    public required double Lat { get; init; }
    public required double Lon { get; init; }
}

