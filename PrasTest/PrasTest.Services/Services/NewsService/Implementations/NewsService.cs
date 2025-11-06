using PrasTest.DataAccess.Repositories.NewsRepository;
using PrasTest.Domain.Entities;
using PrasTest.Services.DTOs;

namespace PrasTest.Services.Services.NewsService.Implementations;

internal class NewsService : INewsService
{
    private readonly INewsRepository _newsRepository;

    public NewsService(INewsRepository newsRepository)
    {
        _newsRepository = newsRepository;
    }

    public async Task<IEnumerable<NewsListItemDTO>> GetLatestNewsAsync(int count)
    {
        var news = await _newsRepository.GetLatestNewsAsync(count);
        return news.Select(MapToListItem);
    }

    public async Task<PagedResultDTO<NewsListItemDTO>> GetPublishedNewsAsync(int page = 1, int pageSize = 10)
    {
        var skip = (page - 1) * pageSize;
        var news = await _newsRepository.GetPublishedNewsAsync(skip, pageSize);
        var totalCount = await _newsRepository.GetPublishedNewsCountAsync();

        return new PagedResultDTO<NewsListItemDTO>
        {
            Items = news.Select(MapToListItem),
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<NewsDTO?> GetNewsByIdAsync(int id)
    {
        var news = await _newsRepository.GetByIdAsync(id);
        return news == null ? null : MapToDTO(news);
    }

    public async Task<NewsDTO> CreateNewsAsync(CreateNewsDTO createNewsDto)
    {
        var news = new News
        {
            Title = createNewsDto.Title,
            ImageUrl = createNewsDto.ImageUrl,
            Subtitle = createNewsDto.Subtitle,
            Content = createNewsDto.Content,
            IsPublished = createNewsDto.IsPublished,
            CreatedAt = DateTime.UtcNow
        };

        var createdNews = await _newsRepository.AddAsync(news);
        return MapToDTO(createdNews);
    }

    public async Task<bool> UpdateNewsAsync(int id, UpdateNewsDTO updateNewsDto)
    {
        var news = await _newsRepository.GetByIdAsync(id);
        if (news == null)
            return false;

        news.Title = updateNewsDto.Title;
        news.ImageUrl = updateNewsDto.ImageUrl;
        news.Subtitle = updateNewsDto.Subtitle;
        news.Content = updateNewsDto.Content;
        news.IsPublished = updateNewsDto.IsPublished;
        news.UpdatedAt = DateTime.UtcNow;

        await _newsRepository.UpdateAsync(news);
        return true;
    }

    public async Task<bool> DeleteNewsAsync(int id)
    {
        var exists = await _newsRepository.ExistsAsync(id);
        if (!exists)
            return false;

        await _newsRepository.DeleteAsync(id);
        return true;
    }

    private NewsListItemDTO MapToListItem(News news)
    {
        return new NewsListItemDTO
        {
            Id = news.Id,
            Title = news.Title,
            ImageUrl = news.ImageUrl,
            Subtitle = news.Subtitle,
            CreatedAt = news.CreatedAt
        };
    }

    private NewsDTO MapToDTO(News news)
    {
        return new NewsDTO
        {
            Id = news.Id,
            Title = news.Title,
            ImageUrl = news.ImageUrl,
            Subtitle = news.Subtitle,
            Content = news.Content,
            CreatedAt = news.CreatedAt,
            UpdatedAt = news.UpdatedAt,
            IsPublished = news.IsPublished
        };
    }
}
