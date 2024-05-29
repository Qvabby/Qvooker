using Microsoft.AspNetCore.Http;
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
        public async Task<ActionResult<ServiceResponse<IdentityResult>>> RegisterUser(UserRegisterDTO model)
        {
            if (ModelState.IsValid) {
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

        }
    }
}
