namespace TripGuide.Api.Services.DeepSeek
{
    public interface IDeepSeekClient
    {
        Task<DeepSeekResult> SendMessageAsync(string message, CancellationToken cancellationToken = default);
    }
}
