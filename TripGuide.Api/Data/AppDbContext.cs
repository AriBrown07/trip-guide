using Microsoft.EntityFrameworkCore;
using TripGuide.Models;

namespace TripGuide.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Дополнительные настройки таблицы
        modelBuilder.Entity<User>().ToTable("Users");
    }
}