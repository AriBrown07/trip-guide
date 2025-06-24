using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Net.Http.Headers;
using TripGuide.Api.Services.DeepSeek;
using Microsoft.EntityFrameworkCore;
using TripGuide.Api.Services; // Добавьте эту строку в начало файла

using Microsoft.EntityFrameworkCore;
using TripGuide.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Добавление сервисов в контейнер DI
builder.Services.AddControllers();  // Исправлено: AddControllers()
builder.Services.AddEndpointsApiExplorer();  // Исправлено: AddEndpointsApiExplorer()
builder.Services.AddSwaggerGen();  // Исправлено: AddSwaggerGen()

// Настройка CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5272")  // Добавлена закрывающая скобка
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Конфигурация HttpClient для DeepSeek
builder.Services.AddHttpClient<IDeepSeekClient, DeepSeekClient>((sp, client) =>
{
    var config = sp.GetRequiredService<IConfiguration>().GetSection("DeepSeek");

    client.BaseAddress = new Uri(config["BaseUrl"]!);
    client.DefaultRequestHeaders.Authorization =
        new AuthenticationHeaderValue("Bearer", config["ApiKey"]);
    client.DefaultRequestHeaders.Accept.Add(
        new MediaTypeWithQualityHeaderValue("application/json"));
});

// Конфигурация DbContext с политикой повторов
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        sqlOptions =>
        {
            sqlOptions.EnableRetryOnFailure(
                maxRetryCount: 5,
                maxRetryDelay: TimeSpan.FromSeconds(10),
                errorNumbersToAdd: null);
        });
});

// Настройка аутентификации JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });

// Регистрация сервисов приложения
builder.Services.AddScoped<IAuthService, AuthService>();
// Не нужно регистрировать IConfiguration повторно - он уже доступен через DI

var app = builder.Build();

// Конфигурация конвейера HTTP-запросов
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseHttpsRedirection();

// Важно: UseAuthentication ДО UseAuthorization!
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();