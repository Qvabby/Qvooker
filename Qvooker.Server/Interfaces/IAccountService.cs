using Microsoft.AspNetCore.Identity;
using Qvooker.Server.Models.DTOs;

namespace Qvooker.Server.Interfaces
{
    public interface IAccountService
    {
        //Register method.
        public Task<ServiceResponse<IdentityResult>> Register(UserRegisterDTO model);
        //Login method.
        public Task<ServiceResponse<SignInResult>> Login(UserLoginDTO model);
        //Logout method.
        public Task<ServiceResponse<string>> Logout();
    }
}
