namespace PrasTest.Domain.Entities;

public class News
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string Subtitle { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public bool IsPublished { get; set; } = true;
    
    // Navigation properties for translations
    public virtual ICollection<NewsTranslation> Translations { get; set; } = new List<NewsTranslation>();
}

