using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace TripGuide.Api.Services.DeepSeek
{
    public class DeepSeekClient : IDeepSeekClient
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;
        private readonly ILogger<DeepSeekClient> _logger;

        public DeepSeekClient(HttpClient httpClient, IConfiguration config, ILogger<DeepSeekClient> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
            _config = config;
            _httpClient.BaseAddress = new Uri(_config["DeepSeek:BaseUrl"]);
            _httpClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", _config["DeepSeek:ApiKey"]);
        }

        public async Task<DeepSeekResult> SendMessageAsync(string message, CancellationToken ct)
        {
            var payload = new
            {
                model = "deepseek/deepseek-chat-v3-0324:free",
                messages = new[]
                {
                    new { role = "user", content = message }
                }
            };

            var json = JsonSerializer.Serialize(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("/api/v1/chat/completions", content, ct);
            var responseContent = await response.Content.ReadAsStringAsync(ct);

            if (!response.IsSuccessStatusCode)
            {
                _logger.LogError("DeepSeek API error: {StatusCode} - {Content}", response.StatusCode, responseContent);

                return new DeepSeekResult
                {
                    Success = false,
                    Message = $"API error: {response.StatusCode} - {responseContent}"
                };
            }

            try
            {
                var result = JsonSerializer.Deserialize<DeepSeekResponse>(responseContent, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                if (result?.Choices?.FirstOrDefault() != null)
                {
                    var text = result.Choices.FirstOrDefault()?.Message?.Content ?? "[no content]";

                    return new DeepSeekResult { Success = true, Message = text };
                }

                return new DeepSeekResult { Success = false, Message = "The answer does not contain a choice." };
            }
            catch (JsonException ex)
            {
                _logger.LogError(ex, "Failed to parse DeepSeek response.");
                return new DeepSeekResult
                {
                    Success = false,
                    Message = "Error parsing API response."
                };
            }
        }
    }
}