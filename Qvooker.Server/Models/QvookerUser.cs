using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Qvooker.Server.Models
{
    public class QvookerUser : IdentityUser
    {
        [Required]
        public required string Name { get; set; }
        [Required]
        public required string LastName { get; set; }
    }
}
