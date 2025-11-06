using PrasTest.Domain.Entities;

namespace PrasTest.Services.Services.TokenService;

public interface ITokenService
{
    string GenerateJwt(Admin user, DateTime expire);
}
