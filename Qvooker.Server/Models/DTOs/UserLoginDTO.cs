using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace Qvooker.Server.Models.DTOs
{
    public class UserLoginDTO
    {
        [Required(ErrorMessage = "Username is Required.")]
        [StringLength(30, ErrorMessage = "Username must be less than 30 characters and more than 2", MinimumLength = 2)]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password is Required.")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [DisplayName("Remember me")]
        public bool RememberMe { get; set; }
    }
}
