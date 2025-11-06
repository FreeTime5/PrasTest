using Microsoft.EntityFrameworkCore;
using PrasTest.Domain.Entities;

namespace PrasTest.DataAccess;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<News> News { get; set; }
    public DbSet<NewsTranslation> NewsTranslations { get; set; }
    public DbSet<Admin> Admins { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // News configuration
        modelBuilder.Entity<News>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(500);
            entity.Property(e => e.ImageUrl).HasMaxLength(1000);
            entity.Property(e => e.Subtitle).HasMaxLength(1000);
            entity.HasIndex(e => e.CreatedAt);
            entity.HasMany(e => e.Translations)
                .WithOne(e => e.News)
                .HasForeignKey(e => e.NewsId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // NewsTranslation configuration
        modelBuilder.Entity<NewsTranslation>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.LanguageCode).IsRequired().HasMaxLength(10);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(500);
            entity.Property(e => e.Subtitle).HasMaxLength(1000);
            entity.HasIndex(e => new { e.NewsId, e.LanguageCode });
        });

        // Admin configuration
        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
            entity.HasIndex(e => e.Email).IsUnique();
            entity.Property(e => e.PasswordHash).IsRequired();
        });
    }
}

