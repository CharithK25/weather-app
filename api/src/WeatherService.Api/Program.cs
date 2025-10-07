using WeatherService.Api.Services;
using WeatherService.Api.WeatherApi;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy
            .WithOrigins("http://localhost:3000") 
            .AllowAnyMethod()
            .AllowAnyHeader());
});



builder.Services.Configure<WeatherApiOptions>(
    builder.Configuration.GetSection("WeatherApi"));

builder.Services.AddHttpClient<IWeatherApiClient, WeatherApiClient>((sp, http) =>
{
    var cfg = builder.Configuration.GetSection("WeatherApi");
    var baseUrl = cfg.GetValue<string>("BaseUrl") ?? "https://api.weatherapi.com/v1/";
    http.BaseAddress = new Uri(baseUrl);
});

builder.Services.AddScoped<IWeatherService, WeatherService1>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "WeatherService API",
        Version = "v1",
        Description = "Provides local time, temperature, sunrise and sunset for a city."
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("AllowFrontend");

app.MapControllers();

app.Run();

public partial class Program { }
