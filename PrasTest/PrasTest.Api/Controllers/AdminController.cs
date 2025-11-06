using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PrasTest.Services.DTOs;
using PrasTest.Services.Services.AuthService;
using PrasTest.Services.Services.NewsService;
using System.Collections.Specialized;

namespace PrasTest.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class AdminController : Controller
{
    private readonly IAuthService _authService;

    public AdminController(
        IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost]
    public async Task<IActionResult> Login([FromBody] AdminLoginDTO model)
    {
        var result = await _authService.ValidateAdminAsync(model);
        
        if (result == null)
        {
            return Unauthorized();
        }
        return Ok(result);
    }
}

