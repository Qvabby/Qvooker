using Microsoft.EntityFrameworkCore;
using Qvooker.Server.Models;
using System.Reflection.Metadata;

namespace Qvooker.Server.Data
{
    public class QvookerDbContext : DbContext
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
    }
}
