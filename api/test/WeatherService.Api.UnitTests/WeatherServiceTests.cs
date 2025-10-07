using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentAssertions;
using Moq;
using WeatherService.Api.Services;
using WeatherService.Api.WeatherApi;

namespace WeatherService.Api.Tests;

public class WeatherServiceTests
{
    [Fact]
    public async Task Returns_Composed_Result()
    {
        var mock = new Mock<IWeatherApiClient>();
        mock.Setup(c => c.GetCurrentAsync("Rotterdam", It.IsAny<CancellationToken>()))
            .ReturnsAsync(new CurrentRoot
            {
                Location = new Location { Name = "Rotterdam", Region = "South Holland", Country = "Netherlands", Localtime = "2022-04-12 11:33" ,
                    Lat = 51.92,
                    Lon = 4.48
                },
                Current = new Current { Temp_c = 15.0 }
            });
        mock.Setup(c => c.GetAstronomyAsync("Rotterdam", new DateOnly(2022, 4, 12), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new AstronomyRoot
            {
                Astronomy = new Astronomy { Astro = new Astro { Sunrise = "06:52 AM", Sunset = "08:34 PM" } }
            });

        var sut = new WeatherService1(mock.Object);

        var dto = await sut.GetWeatherAsync("Rotterdam", CancellationToken.None);

        dto.City.Should().Be("Rotterdam");
        dto.Temperature.Should().Be(15.0);
    }
}

