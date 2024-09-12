using backend.DTOs.Notifications;
using backend.Services.Notifications;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserNotifications(string userId)
        {
            var notifications = await _notificationService.GetUserNotificationsAsync(userId);
            return Ok(notifications);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNotification(CreateNotificationDTO createNotificationDto)
        {
            var notification = await _notificationService.CreateNotificationAsync(createNotificationDto);
            return Ok(notification);
        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> MarkAllAsRead(string userId)
        {
            var notifications = await _notificationService.MarkAllAsRead(userId);
            return Ok(notifications);
        }
    }
}