using Microsoft.Extensions.DependencyInjection;
using PrasTest.DataAccess.Repositories.AdminRepository;
using PrasTest.DataAccess.Repositories.AdminRepository.Implementations;
using PrasTest.DataAccess.Repositories.NewsRepository;
using PrasTest.DataAccess.Repositories.NewsRepository.Implementations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrasTest.DataAccess.Extensions
{
    public static class DiExtensions
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddScoped<INewsRepository, NewsRepository>();
            services.AddScoped<IAdminRepository, AdminRepository>();

            return services;
        }
    }
}
