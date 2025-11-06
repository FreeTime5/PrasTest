using PrasTest.Services.Services.AuthService;

namespace PrasTest.Api;

public static class DbInitializer
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var authService = scope.ServiceProvider.GetRequiredService<IAuthService>();
        
        // Create default admin if it doesn't exist
        var adminCreated = await authService.CreateAdminAsync("admin@prastest.com", "Admin123!");
        
        if (adminCreated)
        {
            Console.WriteLine("Default admin created: admin@prastest.com / Admin123!");
        }
    }
}

