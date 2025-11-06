using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PrasTest.Services.Services.AuthService;
using PrasTest.Services.Services.AuthService.Implementations;
using PrasTest.Services.Services.NewsService;
using PrasTest.Services.Services.NewsService.Implementations;
using PrasTest.Services.Services.TokenService;
using PrasTest.Services.Services.TokenService.Implementations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrasTest.Services.Extensions
{
    public static class DiExtensions
    {
        public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<INewsService, NewsService>();
            services.AddScoped<IAuthService, AuthService>();
            var tokenKey = configuration.GetRequiredSection("TokenKey").Value;
            services.AddScoped<ITokenService, TokenService>(_ => new TokenService(tokenKey));
            return services;
        }
    }
}
