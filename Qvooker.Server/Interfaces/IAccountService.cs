﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Qvooker.Server.Models;
using Qvooker.Server.Models.DTOs;
using Qvooker.Server.Models.DTOs.UserInfo;
using System.Security.Claims;

namespace Qvooker.Server.Interfaces
{
    public interface IAccountService
    {
        //Register method.
        public Task<ServiceResponse<IdentityResult>> Register(UserRegisterDTO model);
        //Login method.
        public Task<ServiceResponse<string>> Login(UserLoginDTO model);
        //Logout method.
        public Task<ServiceResponse<string>> Logout();
        //Jwt Token Generating method.
        public Task<string> GenerateJwtToken(QvookerUser user);
        //getting Any kind of information out of user from database method.
        public Task<ServiceResponse<GetUserInfoDTO>> getUserInfo(ClaimsPrincipal User);
    }
}
