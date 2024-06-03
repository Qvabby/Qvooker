using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Qvooker.Server.Models
{
    public class UserRoomBooking
    {
        public string QvookerUserId { get; set; }
        public QvookerUser QvookerUser { get; set; }

        public int RoomId { get; set; }
        public Room Room { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        // Add a property for the hotel reference
        [ForeignKey("Hotel")]
        public int HotelId { get; set; }
        public Hotel Hotel { get; set; }
    }
}
