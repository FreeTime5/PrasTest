using PrasTest.DataAccess.Repositories.BaseRepository;
using PrasTest.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrasTest.DataAccess.Repositories.NewsRepository
{
    public interface INewsRepository : IBaseRepository<News>
    {
        Task<IEnumerable<News>> GetLatestNewsAsync(int count);
        Task<IEnumerable<News>> GetPublishedNewsAsync(int skip = 0, int take = 10);
        Task<int> GetPublishedNewsCountAsync();
        Task<News?> GetWithTranslationsAsync(int id);
    }
}
