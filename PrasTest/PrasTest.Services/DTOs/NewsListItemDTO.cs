namespace PrasTest.Services.DTOs;

public class NewsListItemDTO
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string Subtitle { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}

