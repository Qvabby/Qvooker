
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Qvooker.Server.Data;
using Qvooker.Server.Interfaces;
using Qvooker.Server.Services;

namespace Qvooker.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            #region ----------------------SQLConnection-------------------------
            //Connecting API to Database.
            builder.Services.AddDbContext<QvookerDbContext>(opt =>

                opt.UseSqlServer(builder.Configuration.GetConnectionString("DevelopmentConnection"))

            );
            #endregion

            #region ------------------Identity-----------------------
            //Adding Identity.----------------------------------------------------
            builder.Services.AddIdentity<IdentityUser, IdentityRole>()
                .AddRoles<IdentityRole>() // Registering Role-Based Authorization
                .AddDefaultTokenProviders()
                .AddEntityFrameworkStores<QvookerDbContext>();

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
            builder.Services.AddSwaggerGen();

            #region ------------------------Imapper------------------------------

            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });

            IMapper mapper = mapperConfig.CreateMapper();

            #endregion

            #region --------------------Singleton/Scoped/Transients--------------------

            //APPLICATION SINGLETONS / SCOPEDS / TRANSIENTS
            builder.Services.AddSingleton(mapper);
            builder.Services.AddScoped<IAccountService, AccountService>();

            #endregion

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

            app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
