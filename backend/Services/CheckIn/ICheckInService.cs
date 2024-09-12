using backend.DTOs.CheckIn;

namespace backend.Services
{
    public interface ICheckInService
    {
        Task<GetCheckInDTO> GetCheckInById(int id);
        Task<List<GetCheckInDTO>> GetAllCheckIn();
        Task<List<GetCheckInDTO>> GetCheckInsByUserId(string userId);
        Task<List<GetCheckInDTO>> GetFeedCheckIns(string currentUserId);
        Task CreateCheckIn(CreateCheckInDTO createCheckInDTO);
        Task UpdateCheckIn(UpdateCheckinDTO updateCheckinDTO);
        Task DeleteCheckIn(int id);
    }
}