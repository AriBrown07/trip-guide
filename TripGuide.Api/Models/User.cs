
// Models/User.cs
using System.ComponentModel.DataAnnotations;

public class User
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(50)]
    public string Username { get; set; }

    [Required]
    public string PasswordHash { get; set; }

    [EmailAddress]
    public string Email { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}