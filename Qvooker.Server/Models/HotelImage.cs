using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Qvooker.Server.Models
{
    public class HotelImage
    {
        [Key]
        public int HotelImageId { get; set; }

        public int HotelId { get; set; }

        public string ImageUrl { get; set; }

        [ForeignKey("HotelId")]
        public virtual Hotel Hotel { get; set; }
    }
}
