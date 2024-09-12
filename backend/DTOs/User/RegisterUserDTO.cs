using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.User
{
    public class RegisterUserDTO
    {
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string UserName { get; set; }
        public required string Email {get;set;}
        public required string Password {get;set;}
        public IFormFile? ProfilePicture { get; set; }

    }
}