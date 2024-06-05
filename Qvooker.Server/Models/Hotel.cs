using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Qvooker.Server.Models
{
    public class Hotel
    {
        [Key]
        public int HotelId { get; set; }
        //hotel name
        [Column(TypeName = "nvarchar(50)")]
        public string HotelName { get; set; }
        [Range(1,5,ErrorMessage = "Hotel Star Rating Value Must be in between of 1 and 5.")]
        public byte Stars { get; set; }

        //hotel adress linked to Hotel class.
        public virtual ICollection<Adress> HotelAdresses { get; set; }

        //hotel rooms linked to hotel class.
        public virtual ICollection<Room> Rooms { get; set; }
        // Collection to represent the many-to-many relationship with QvookerUser
        public virtual ICollection<UserRoomBooking> BookedRooms { get; set; } = new List<UserRoomBooking>();
        // Navigation property to relate Hotel to its images
        public virtual ICollection<HotelImage> HotelImages { get; set; }

    }
}
