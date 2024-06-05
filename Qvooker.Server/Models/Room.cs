using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Qvooker.Server.Models
{
    public class Room
    {
        [Key]
        public int RoomId { get; set; }
        [Column(TypeName ="nvarchar(50)")]
        public string Name { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        public string Description { get; set; }
        public decimal price { get; set; }

        //one to many.
        [ForeignKey("hotel")]
        public int HotelId { get; set; }
        public virtual Hotel hotel { get; set; }

        // Collection to represent the many-to-many relationship with UserRoomBooking
        public virtual ICollection<UserRoomBooking> BookedByUsers { get; set; } = new List<UserRoomBooking>();
        // Navigation property to relate Room to its images
        public virtual ICollection<RoomImage> RoomImages { get; set; }
    }
}
