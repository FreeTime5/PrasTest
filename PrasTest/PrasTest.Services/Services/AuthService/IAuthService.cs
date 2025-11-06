using PrasTest.Services.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrasTest.Services.Services.AuthService
{
    public interface IAuthService
    {
        Task<LoginResultDto> ValidateAdminAsync(AdminLoginDTO loginDto);
        Task<bool> CreateAdminAsync(string email, string password);
    }
}
