using backend.DTOs.CheckIn;

namespace backend.Services
{
    public interface ICheckInService
    {
        Task<GetCheckInDTO> GetCheckInById(int id, string currentUserId);
        Task<List<GetCheckInDTO>> GetAllCheckIn();
        Task<List<GetCheckInDTO>> GetCheckInsByUserId(string userId, string sort = "date_desc", string country = null!);
        Task<List<GetCheckInDTO>> GetFeedCheckIns(string currentUserId);
        Task CreateCheckIn(CreateCheckInDTO createCheckInDTO);
        Task UpdateCheckIn(UpdateCheckinDTO updateCheckinDTO);
        Task DeleteCheckIn(int id);
    }
}