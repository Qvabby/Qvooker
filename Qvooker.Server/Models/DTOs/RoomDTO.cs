using System.ComponentModel.DataAnnotations.Schema;

namespace Qvooker.Server.Models.DTOs
{
    public class RoomDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal price { get; set; }
    }
}
