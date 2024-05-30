using Azure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Qvooker.Server.Data;
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
        private readonly QvookerDbContext _qvookerDbContext;
        public AccountService(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, QvookerDbContext qvookerDbContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _qvookerDbContext = qvookerDbContext;
        }

        /// <summary>
        /// Functionality of Login.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<SignInResult>> Login(UserLoginDTO model)
        {
            //Creating Service Response.
            var Response = new ServiceResponse<SignInResult>();
            //Try Catch for handling.
            Response.Description = "Service is to Log in user.";
            try
            {

                //trying to sign in
                var result = await _signInManager.PasswordSignInAsync(model.Username, model.Password, isPersistent: false, true);
                Response.Data = result;


                //checks result.
                if (result.Succeeded) 
                { 
                    Response.ServiceSuccess = true;
                    Response.Description = "User signed in";
                    return Response; 
                }

                //In case I add TwoFactorAuth...
                //if (result.RequiresTwoFactor) { }

                //if account is locked out
                if (result.IsLockedOut)
                {
                    //get user
                    var user = _qvookerDbContext.qvookerUsers.FirstOrDefault(u => u.UserName == model.Username);
                    //get time
                    var time = user.LockoutEnd - DateTime.UtcNow;
                    var Seconds = time.Value.Seconds;
                    var Minutes = time.Value.Minutes;
                    //display how much time left.
                    string ErrorMessage = $"Hello {user.Name}, Your Account is Locked for {Minutes} Minutes {Seconds} seconds.";

                    Response.Description = "User is on LockOut";
                    Response.essentialData = ErrorMessage;
                }

                //since we don't have every case just returning Response.
                return Response;

            }
            catch (Exception e)
            {
                Response.errorMessage = e.Message;
                return Response;
            }
        }
        /// <summary>
        /// Functionality of Logging Out.
        /// </summary>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Logout()
        {
            //creating Service response for LoggingOut.
            var Response = new ServiceResponse<string>();
            try
            {
                await _signInManager.SignOutAsync();
                Response.ServiceSuccess = true;
                Response.Data = "user successfully logged out.";
            }
            catch (Exception e)
            {
                Response.errorMessage = e.Message;
                return Response;
            }
            return Response;
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
