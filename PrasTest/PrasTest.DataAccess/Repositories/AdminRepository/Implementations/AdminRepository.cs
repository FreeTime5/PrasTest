using Microsoft.EntityFrameworkCore;
using PrasTest.DataAccess.Repositories.BaseRepository.Implementations;
using PrasTest.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrasTest.DataAccess.Repositories.AdminRepository.Implementations
{
    internal class AdminRepository : BaseRepository<Admin>, IAdminRepository
    {
        public AdminRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<Admin?> GetByEmailAsync(string email)
        {
            return await _dbSet
                .FirstOrDefaultAsync(a => a.Email.ToLower() == email.ToLower());
        }
    }
}
