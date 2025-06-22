// Models/User.cs
public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Password { get; set; } // В реальном проекте храните только хеш пароля!
}