using Microsoft.EntityFrameworkCore;
using PrasTest.DataAccess.Repositories.BaseRepository.Implementations;
using PrasTest.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrasTest.DataAccess.Repositories.NewsRepository.Implementations
{
    internal class NewsRepository : BaseRepository<News>, INewsRepository
    {
        public NewsRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<News>> GetLatestNewsAsync(int count)
        {
            return await _dbSet
                .Where(n => n.IsPublished)
                .OrderByDescending(n => n.CreatedAt)
                .Take(count)
                .ToListAsync();
        }

        public async Task<IEnumerable<News>> GetPublishedNewsAsync(int skip = 0, int take = 10)
        {
            return await _dbSet
                .Where(n => n.IsPublished)
                .OrderByDescending(n => n.CreatedAt)
                .Skip(skip)
                .Take(take)
                .ToListAsync();
        }

        public async Task<int> GetPublishedNewsCountAsync()
        {
            return await _dbSet.CountAsync(n => n.IsPublished);
        }

        public async Task<News?> GetWithTranslationsAsync(int id)
        {
            return await _dbSet
                .Include(n => n.Translations)
                .FirstOrDefaultAsync(n => n.Id == id);
        }
    }
}
