namespace Qvooker.Server.Models.DTOs.UserInfo
{
    public class GetUserInfoDTO
    {
        /*
         * Id = user.Id,
                         Name = user.Name,
                         LastName = user.LastName,
                         PhoneNumber = user.PhoneNumber,
                         Email = user.Email,
                         UserName = user.UserName,
                         UserRoomBookings = user.UserRoomBookings
            .Where(x => x.Room != null && x.Hotel != null) // Exclude null values
            .Select(x => new UserRoomBooking
            {
                RoomId = x.RoomId,
                StartDate = x.StartDate,
                EndDate = x.EndDate,
                HotelId = x.HotelId,
                Room = new Room
                {
                    Name = x.Room.Name,
                    price = x.Room.price,
                    Description = x.Room.Description
                },
                Hotel = x.Hotel.HotelAdresses != null && x.Hotel.HotelAdresses.Any() ?
                    new Hotel
                    {
                        HotelId = x.HotelId,
                        HotelAdresses = x.Hotel.HotelAdresses
         * */
        public string userId { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public virtual ICollection<GetUserRoomInfoDTO> BookedRooms { get; set; }
        //public virtual ICollection<GetUserRoomInfoDTO> BookedRooms { get; set; }

    }
}
