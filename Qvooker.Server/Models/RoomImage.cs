using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Qvooker.Server.Models
{
    public class RoomImage
    {
        [Key]
        public int RoomImageId { get; set; }

        public int RoomId { get; set; }

        public string ImageUrl { get; set; }

        [ForeignKey("RoomId")]
        public virtual Room Room { get; set; }
    }
}
