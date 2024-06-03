using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Qvooker.Server.Models;
using System.Reflection.Metadata;

namespace Qvooker.Server.Data
{
    public class QvookerDbContext : IdentityDbContext<QvookerUser>
    {
        public QvookerDbContext(DbContextOptions options) : base(options)
        {
        }
        //Adding HotelsTb
        public DbSet<Hotel> Hotels { get; set; }
        //Adding AdressesTb
        public DbSet<Adress> Adresses { get; set; }
        //Adding RoomsTb
        public DbSet<Room> Rooms { get; set; }
        //Adding UsersTb
        public DbSet<QvookerUser> qvookerUsers { get; set; }
        //relation of qvookerUser and Hotel (for booking)
        public DbSet<UserRoomBooking> UserRoomBookings { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Configure primary key for UserRoomBooking entity
            builder.Entity<UserRoomBooking>()
                .HasKey(urb => new { urb.QvookerUserId, urb.RoomId, urb.StartDate });

            // Configure relationship with QvookerUser
            builder.Entity<UserRoomBooking>()
                .HasOne(urb => urb.QvookerUser)
                .WithMany(u => u.UserRoomBookings)
                .HasForeignKey(urb => urb.QvookerUserId)
                .OnDelete(DeleteBehavior.NoAction);

            // Configure relationship with Room
            builder.Entity<UserRoomBooking>()
                .HasOne(urb => urb.Room)
                .WithMany(r => r.BookedByUsers)
                .HasForeignKey(urb => urb.RoomId)
                .OnDelete(DeleteBehavior.NoAction);

            // Configure relationship with Hotel
            builder.Entity<UserRoomBooking>()
                .HasOne(urb => urb.Hotel)
                .WithMany(h => h.BookedRooms)
                .HasForeignKey(urb => urb.HotelId)
                .OnDelete(DeleteBehavior.NoAction);

            // Configure required properties
            builder.Entity<UserRoomBooking>()
                .Property(urb => urb.StartDate)
                .IsRequired();

            builder.Entity<UserRoomBooking>()
                .Property(urb => urb.EndDate)
                .IsRequired();

            // Add check constraint for date range
            builder.Entity<UserRoomBooking>()
                .HasCheckConstraint("CK_UserRoomBooking_Dates", "[EndDate] > [StartDate]");
        }

    }
}
