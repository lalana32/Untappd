using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.Notifications;
using backend.Models;

namespace backend.Services.Notifications
{
    public interface INotificationService
    {
        Task<IEnumerable<Notification>> GetUserNotificationsAsync(string userId);
        Task<Notification> CreateNotificationAsync(CreateNotificationDTO createNotificationDto);
        Task<List<Notification>> MarkAllAsRead(string userId);
    }
}