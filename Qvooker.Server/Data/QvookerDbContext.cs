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
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
            
        //}
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<Adress> Adresses { get; set; }
        public DbSet<Room> Rooms { get; set; }
    }
}
