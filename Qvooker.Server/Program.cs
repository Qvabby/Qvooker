
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Qvooker.Server.Data;
using Qvooker.Server.Interfaces;
using Qvooker.Server.Services;
using System.Text;
using Microsoft.Extensions.Configuration;
using Qvooker.Server.Models;
using Microsoft.OpenApi.Models;

namespace Qvooker.Server
{
    public class Program
    {
        //public IConfiguration _Configuration { get; }

        //public Program(IConfiguration configuration)
        //{
        //    _Configuration = configuration;
        //}


        public static void Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);

            #region SQLConnection
            //Connecting API to Database.
            builder.Services.AddDbContext<QvookerDbContext>(opt =>
                opt.UseSqlServer(builder.Configuration.GetConnectionString("DevelopmentConnection")));
            #endregion

            #region ------------------Identity-----------------------
            //Adding Identity.----------------------------------------------------
            builder.Services.AddIdentity<QvookerUser, IdentityRole>()
                .AddRoles<IdentityRole>() // Registering Role-Based Authorization
                .AddDefaultTokenProviders()
                .AddEntityFrameworkStores<QvookerDbContext>();

            //JwtToken
            var key = Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"]);
            builder.Services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(opt =>
                {
                    opt.RequireHttpsMetadata = false;
                    opt.SaveToken = true;
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        ClockSkew = TimeSpan.Zero
                    };
                });

            //Adding Administrator Role via policy.
            builder.Services.AddAuthorization(opt =>
            {
                opt.AddPolicy("RequireAdministrationRole",
                    policy => policy.RequireRole("Admin"));
            });



            //configuring Authorization.
            builder.Services.Configure<IdentityOptions>(opt =>
            {
                //Password Configuration
                // Password settings.
                opt.Password.RequireDigit = true;
                opt.Password.RequireLowercase = true;
                opt.Password.RequireNonAlphanumeric = true;
                opt.Password.RequireUppercase = true;
                opt.Password.RequiredLength = 5;
                opt.Password.RequiredUniqueChars = 0;

                // Lockout settings.
                opt.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                opt.Lockout.MaxFailedAccessAttempts = 5;
                opt.Lockout.AllowedForNewUsers = true;

                // User settings.
                opt.User.AllowedUserNameCharacters =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
                opt.User.RequireUniqueEmail = false;
            });

            //Cookies
            builder.Services.ConfigureApplicationCookie(options =>
            {
                // Cookie settings
                options.Cookie.HttpOnly = true;
                options.ExpireTimeSpan = TimeSpan.FromMinutes(5);

                options.LoginPath = "/Account/Login";
                options.AccessDeniedPath = "/Account/AccessDenied";
                options.SlidingExpiration = true;
            });
            //-----------------------------------------------------------
            #endregion


            builder.Services.AddControllers();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(opt =>
            {

                opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                opt.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] {}
                    }
                });
            });


            #region ------------------------Imapper------------------------------

            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });

            IMapper mapper = mapperConfig.CreateMapper();
            builder.Services.AddSingleton(mapper);
            #endregion

            #region DI for Application Services
            builder.Services.AddScoped<IAccountService, AccountService>();
            builder.Services.AddScoped<IBookingService, BookingService>();
            #endregion




            builder.Services.AddAuthorization();



            builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            //http / https stuff.
            builder.Services.AddCors(c =>
            {
                c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyMethod().
                 AllowAnyHeader());
            });


            var app = builder.Build();

            app.UseCors("AllowOrigin");


            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");



            app.Run();
        }
    }
}
