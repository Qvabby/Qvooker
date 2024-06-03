namespace Qvooker.Server.Models.DTOs
{
    public class BookRoomDTO
    {
        public string UserId { get; set; }
        public int HotelId { get; set; }
        public int RoomId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
