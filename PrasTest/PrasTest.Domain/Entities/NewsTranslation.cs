namespace PrasTest.Domain.Entities;

public class NewsTranslation
{
    public int Id { get; set; }
    public int NewsId { get; set; }
    public string LanguageCode { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Subtitle { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    
    // Navigation properties
    public virtual News News { get; set; } = null!;
}

