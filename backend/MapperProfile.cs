using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.DTOs.CheckIn;
using backend.DTOs.Notifications;
using backend.DTOs.User;
using backend.Models;

namespace backend
{
    public class MapperProfile : Profile
    {
         public MapperProfile()
        {
            // Mapiranje između CheckIn i DTO
            CreateMap<CheckIn, GetCheckInDTO>();
        
            CreateMap<CreateCheckInDTO, CheckIn>();
        
            CreateMap<UpdateCheckinDTO, CheckIn>();

            CreateMap<RegisterUserDTO, User>();
            CreateMap<RegisterUserDTO, UserDTO>();

            CreateMap<User, UserDTO>();
            CreateMap<CreateNotificationDTO, Notification>();
              
        }
    }
}