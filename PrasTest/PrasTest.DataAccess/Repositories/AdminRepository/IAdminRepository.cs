using PrasTest.DataAccess.Repositories.BaseRepository;
using PrasTest.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrasTest.DataAccess.Repositories.AdminRepository
{
    public interface IAdminRepository : IBaseRepository<Admin>
    {
        Task<Admin?> GetByEmailAsync(string email);
    }
}
