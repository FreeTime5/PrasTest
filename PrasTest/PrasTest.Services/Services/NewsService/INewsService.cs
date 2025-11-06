using PrasTest.Services.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrasTest.Services.Services.NewsService
{
    public interface INewsService
    {
        Task<IEnumerable<NewsListItemDTO>> GetLatestNewsAsync(int count);
        Task<PagedResultDTO<NewsListItemDTO>> GetPublishedNewsAsync(int page = 1, int pageSize = 10);
        Task<NewsDTO?> GetNewsByIdAsync(int id);
        Task<NewsDTO> CreateNewsAsync(CreateNewsDTO createNewsDto);
        Task<bool> UpdateNewsAsync(int id, UpdateNewsDTO updateNewsDto);
        Task<bool> DeleteNewsAsync(int id);
    }
}
