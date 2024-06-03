namespace Qvooker.Server.Models.DTOs.UserInfo
{
    public class GETUserHotelInfoDTO
    {
        public int Id { get; set; }
        public string HotelName { get; set; }
        public virtual ICollection<GetUserHotelAdressesInfoDTO> HotelAdresses { get; set; }
        public virtual ICollection<GetUserRoomInfoDTO> Rooms { get; set; }
    }
}
