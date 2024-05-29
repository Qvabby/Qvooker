using Azure;
using Microsoft.AspNetCore.Identity;
using Qvooker.Server.Interfaces;
using Qvooker.Server.Models;
using Qvooker.Server.Models.DTOs;

namespace Qvooker.Server.Services
{
    public class AccountService : IAccountService
    {
        //Using Dependency injection.
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        public AccountService(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        /// <summary>
        /// Functionality of Login.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public Task<ServiceResponse<SignInResult>> Login(UserLoginDTO model)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// Functionality of Logging Out.
        /// </summary>
        /// <returns></returns>
        public Task<ServiceResponse<string>> Logout()
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// Functionality of Registering user.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<IdentityResult>> Register(UserRegisterDTO model)
        {
            //Creating Service Response.
            var Response = new ServiceResponse<IdentityResult>();
            //using try catch for better handling.
            try
            {
                //Creating user instance.
                var user = new QvookerUser
                {
                    Name = model.Name,
                    LastName = model.LastName,
                    UserName = model.Username,
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber,
                };
                //Sign Up User to database.
                var result = await _userManager.CreateAsync(user, model.Password);
                //check if registered.
                if (result.Succeeded)
                {
                    //automatically signs user in.
                    await _signInManager.SignInAsync(user, isPersistent: false);

                }
                Response.Data = result;
                Response.Description = "This Response Service carries Register Result Type.";
                Response.ServiceSuccess = true;
                return Response;
            }
            catch (Exception e)
            {
                Response.errorMessage = e.Message;
                return Response;
            }
        }
    }
}
