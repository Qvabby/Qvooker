﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Qvooker.Server.Interfaces;
using Qvooker.Server.Models.DTOs;
using Qvooker.Server.Services;

namespace Qvooker.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }
        [HttpPost]
        [Route("/register")]
        public async Task<ActionResult<ServiceResponse<IdentityResult>>> RegisterUser(UserRegisterDTO model)
        {
            if (ModelState.IsValid)
            {
                //get result from account service register.
                var serviceResponse = await _accountService.Register(model);
                if (serviceResponse.ServiceSuccess)
                {
                    return Ok(new { success = true, message = "Registration successful" });
                }
                else
                {
                    return BadRequest(new { success = false, message = "Registration failed", error = serviceResponse.errorMessage });
                }
            }
            return BadRequest(new { success = false, message = "Invalid data" });
        }

        [HttpPost]
        [Route("/login")]
        public async Task<ActionResult<ServiceResponse<Microsoft.AspNetCore.Identity.SignInResult>>> LoginUser(UserLoginDTO model)
        {
            if (ModelState.IsValid)
            {
                //get result from account service login.
                var serviceResponse = await _accountService.Login(model);
                if (serviceResponse.ServiceSuccess)
                {
                    return Ok(new { success = serviceResponse.ServiceSuccess, message = serviceResponse.Description, errorMessage = serviceResponse.errorMessage, essentialData = serviceResponse.essentialData});
                }
                else
                {
                    return BadRequest(new { success = serviceResponse.ServiceSuccess, message = serviceResponse.Description, errorMessage = serviceResponse.errorMessage, essentialData = serviceResponse.essentialData });
                }
            }
            return BadRequest(new { success = false, message = "Invalid Data." });
        }

        [HttpPost]
        [Route("/logout")]
        public async Task<ActionResult<ServiceResponse<string>>> LogoutUser()
        {
            var serviceResponse = await _accountService.Logout();
            if (serviceResponse.ServiceSuccess)
            {
                //return Ok(new { success = true, error = serviceResponse.errorMessage, data = serviceResponse.Data });
                return Ok(new { success = serviceResponse.ServiceSuccess, message = serviceResponse.Description, errorMessage = serviceResponse.errorMessage, essentialData = serviceResponse.essentialData });
            }
            else
            {
                return BadRequest(new { success = serviceResponse.ServiceSuccess, message = serviceResponse.Description, errorMessage = serviceResponse.errorMessage, essentialData = serviceResponse.essentialData});
            }

        }
    }
}

