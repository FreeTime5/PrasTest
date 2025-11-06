using System.ComponentModel.DataAnnotations;

namespace PrasTest.Services.DTOs;

public class UpdateNewsDTO
{
    [Required(ErrorMessage = "Title is required")]
    [MaxLength(500, ErrorMessage = "Title must not exceed 500 characters")]
    public string Title { get; set; } = string.Empty;
    
    [Url(ErrorMessage = "Invalid image URL")]
    public string ImageUrl { get; set; } = string.Empty;
    
    [MaxLength(1000, ErrorMessage = "Subtitle must not exceed 1000 characters")]
    public string Subtitle { get; set; } = string.Empty;
    
    [Required(ErrorMessage = "Content is required")]
    public string Content { get; set; } = string.Empty;
    
    public bool IsPublished { get; set; }
}

