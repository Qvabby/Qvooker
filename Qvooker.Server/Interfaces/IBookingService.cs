using Qvooker.Server.Models;
using Qvooker.Server.Models.DTOs;

namespace Qvooker.Server.Interfaces
{
    public interface IBookingService
    {
        public Task<ServiceResponse<bool>> isHotelAvailable(BookRoomDTO model);
        public Task<ServiceResponse<UserRoomBooking>> BookRoomAsync(BookRoomDTO model); 
    }
}
