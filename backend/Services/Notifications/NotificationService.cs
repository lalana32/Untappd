using AutoMapper;
using backend.Data;
using backend.DTOs.Notifications;
using backend.Models;
using Microsoft.EntityFrameworkCore;


namespace backend.Services.Notifications
{
    public class NotificationService : INotificationService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

        public NotificationService(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
        }

    public async Task<IEnumerable<Notification>> GetUserNotificationsAsync(string userId)
    {
        return await _context.Notifications
            .Where(n => n.UserId == userId)
            .OrderByDescending(n => n.CreatedAt)
            .Select(n => new Notification
            {
                Id = n.Id,
                Message = n.Message,
                IsRead = n.IsRead,
                CreatedAt = n.CreatedAt,
                InteractingUserId = n.InteractingUserId,
                PostId = n.PostId,
                Type = n.Type
            })
            .ToListAsync();

    }

    public async Task<Notification> CreateNotificationAsync(CreateNotificationDTO createNotificationDto)
    {
    
        var notification = _mapper.Map<Notification>(createNotificationDto);

        _context.Notifications.Add(notification);
        await _context.SaveChangesAsync();

        return notification;
    }

    public async Task<List<Notification>> MarkAllAsRead(string userId)
    {
        var notifications = await _context.Notifications
            .Where(n => n.UserId == userId && !n.IsRead)
            .ToListAsync();


        foreach (var notification in notifications)
        {
            notification.IsRead = true;
        }

        _context.Notifications.UpdateRange(notifications);
        await _context.SaveChangesAsync();

        return notifications;
    }
}

}