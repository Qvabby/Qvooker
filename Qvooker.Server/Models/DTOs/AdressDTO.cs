using System.ComponentModel.DataAnnotations.Schema;

namespace Qvooker.Server.Models.DTOs
{
    public class AdressDTO
    {
        public int AdressId { get; set; }
        public int HotelId { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
    }
}
