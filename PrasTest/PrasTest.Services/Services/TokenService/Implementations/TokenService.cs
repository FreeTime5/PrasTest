using Microsoft.IdentityModel.Tokens;
using PrasTest.Domain.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PrasTest.Services.Services.TokenService.Implementations;

internal class TokenService : ITokenService
{
    private readonly string key;

    public TokenService(string key)
    {
        this.key = key;
    }

    public string GenerateJwt(Admin admin, DateTime expire)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Email, admin.Email),
                new Claim(ClaimTypes.Role, "Admin"),
            };

        var seurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        var signinCred = new SigningCredentials(seurityKey, SecurityAlgorithms.HmacSha256Signature);

        var securityToken = new JwtSecurityToken(
            claims: claims,
            expires: expire,
            signingCredentials: signinCred);

        return new JwtSecurityTokenHandler().WriteToken(securityToken);
    }
}
