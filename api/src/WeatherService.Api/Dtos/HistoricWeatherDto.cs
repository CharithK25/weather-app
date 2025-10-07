namespace WeatherService.Api.Dtos;

public sealed record HistoricWeatherDto(
    string Date,
    double AvgTempC,
    double MaxTempC,
    double MinTempC
);
