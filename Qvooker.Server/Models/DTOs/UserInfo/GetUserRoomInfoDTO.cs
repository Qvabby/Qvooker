namespace Qvooker.Server.Models.DTOs.UserInfo
{
    public class GetUserRoomInfoDTO
    {
        public int id { get; set; }
        public int HotelId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal price { get; set; }
        public virtual ICollection<GetUserHotelAdressesInfoDTO> HotelAdresses { get; set; }
    }
}
