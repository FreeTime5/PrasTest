using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using PrasTest.DataAccess.Repositories.AdminRepository;
using PrasTest.Domain.Entities;
using PrasTest.Services.DTOs;
using PrasTest.Services.Services.TokenService;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
namespace PrasTest.Services.Services.AuthService.Implementations
{
    internal class AuthService : IAuthService
    {
        private readonly IAdminRepository _adminRepository;
        private readonly ITokenService tokenService;

        public AuthService(IAdminRepository adminRepository,
            ITokenService tokenService)
        {
            _adminRepository = adminRepository;
            this.tokenService = tokenService;
        }

        public async Task<LoginResultDto> ValidateAdminAsync(AdminLoginDTO loginDto)
        {
            var admin = await _adminRepository.GetByEmailAsync(loginDto.Email);
            if (admin == null)
                return null;

            var isValidPassword = BCrypt.Net.BCrypt.Verify(loginDto.Password, admin.PasswordHash);
            if (isValidPassword)
            {
                admin.LastLoginAt = DateTime.UtcNow;
                await _adminRepository.UpdateAsync(admin);
            }

            return new LoginResultDto()
            {
                Token = tokenService.GenerateJwt(admin, DateTime.Now.AddMinutes(15)),
                IsLoggedIn = true
            };
        }

        public async Task<bool> CreateAdminAsync(string email, string password)
        {
            var existingAdmin = await _adminRepository.GetByEmailAsync(email);
            if (existingAdmin != null)
                return false;

            var admin = new Admin
            {
                Email = email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
                CreatedAt = DateTime.UtcNow
            };

            await _adminRepository.AddAsync(admin);
            return true;
        }
    }
}
