using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Qvooker.Server.Models
{
    public class Adress
    {
        [Key]
        public int AdressId { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Country { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string City { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Street { get; set; }


        //one to many.
        [ForeignKey("hotel")]
        public int HotelId { get; set; }
        public virtual Hotel hotel { get; set; }
        
    }
}
