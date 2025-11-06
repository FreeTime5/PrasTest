using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PrasTest.Services.DTOs;
using PrasTest.Services.Services.NewsService;

namespace PrasTest.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class NewsController : Controller
{
    private readonly INewsService _newsService;

    public NewsController(INewsService newsService)
    {
        _newsService = newsService;
    }

    [HttpGet]
    [Route("latest")]
    public async Task<IActionResult> GetLatest([FromQuery] int count = 1)
    {
        const int pageSize = 10;
        var result = await _newsService.GetLatestNewsAsync(count);

        return Ok(result);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> Details([FromRoute] int id)
    {
        var news = await _newsService.GetNewsByIdAsync(id);

        return Ok(news);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] CreateNewsDTO requestDto)
    {
        var news = await _newsService.CreateNewsAsync(requestDto);

        return Ok(news);
    }

    [HttpPut]
    [Authorize]
    [Route("{id}")]
    public async Task<IActionResult> Edit([FromRoute] int id, [FromBody] UpdateNewsDTO requestDto)
    {
        var isUpdated = await _newsService.UpdateNewsAsync(id, requestDto);

        return Ok(isUpdated);
    }

    [HttpGet]
    public async Task<IActionResult> NewsList([FromQuery] int page, [FromQuery] int pageSize)
    {
        var result = await _newsService.GetPublishedNewsAsync(page, pageSize);

        return Ok(result);
    }

    [HttpDelete]
    [Authorize]
    [Route("{id}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var success = await _newsService.DeleteNewsAsync(id);

        return Ok(success);
    }
}

