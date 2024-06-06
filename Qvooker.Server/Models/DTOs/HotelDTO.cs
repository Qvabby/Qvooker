using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Qvooker.Server.Models.DTOs
{
    public class HotelDTO
    {
        //hotel name
        public string HotelName { get; set; }
        [Range(1, 5, ErrorMessage = "Hotel Star Rating Value Must be in between of 1 and 5.")]
        public byte Stars { get; set; }

        public ICollection<IFormFile> HotelImages { get; set; }
        public virtual ICollection<AdressDTO> HotelAdresses { get; set; }

        //hotel rooms linked to hotel class.
        public virtual ICollection<RoomDTO> Rooms { get; set; }
    }
}
