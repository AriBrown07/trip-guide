using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Net.Http.Headers;
using TripGuide.Api.Services.DeepSeek;
using Microsoft.EntityFrameworkCore;
using TripGuide.Data;

var builder = WebApplication.CreateBuilder(args);

// Настройка для продакшена
if (!builder.Environment.IsDevelopment())
{
    builder.WebHost.UseUrls("http://*:5000;https://*:5001");
}

// Добавление сервисов
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Настройка Swagger
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "TripGuide API", Version = "v1" });

    // Добавляем поддержку JWT в Swagger
    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Please enter token",
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });

    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// Настройка CORS
var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>()
    ?? new[] {
        "http://localhost:3000",
        "https://map-history.com", // Добавлен фронтенд
        "https://api.map-history.com"
    };

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins(builder.Configuration.GetSection("AllowedOrigins").Get<string[]>())
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Настройка HttpClient для DeepSeek
builder.Services.AddHttpClient<IDeepSeekClient, DeepSeekClient>((sp, client) =>
{
    var config = sp.GetRequiredService<IConfiguration>().GetSection("DeepSeek");
    client.BaseAddress = new Uri(config["BaseUrl"]!);
    client.DefaultRequestHeaders.Authorization =
        new AuthenticationHeaderValue("Bearer", config["ApiKey"]);
    client.DefaultRequestHeaders.Accept.Add(
        new MediaTypeWithQualityHeaderValue("application/json"));
});

// Настройка базы данных
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

// Настройка аутентификации
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
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)),
            ClockSkew = TimeSpan.Zero // Убираем запас времени для токена
        };

        // Для отладки CORS (не для продакшена)
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                context.Token = context.Request.Cookies["access_token"];
                return Task.CompletedTask;
            }
        };
    });

var app = builder.Build();

// Конфигурация конвейера запросов

    app.UseSwagger();
    app.UseSwaggerUI();


app.UseHttpsRedirection();

// Важно: CORS должен быть перед аутентификацией!
app.UseCors("AllowSpecificOrigins");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Глобальная обработка ошибок
app.UseExceptionHandler("/error");

app.Run();

