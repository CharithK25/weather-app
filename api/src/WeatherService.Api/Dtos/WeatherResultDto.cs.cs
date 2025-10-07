namespace WeatherService.Api.Dtos;

public sealed record WeatherResultDto(
    string City,
    string Region,
    string Country,
    DateTime LocalTime,
    double Temperature,
    string Sunrise,
    string Sunset,
    double Latitude,
    double Longitude
);

