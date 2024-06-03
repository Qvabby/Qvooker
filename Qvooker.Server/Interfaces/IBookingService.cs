namespace Qvooker.Server.Interfaces
{
    public interface IBookingService
    {
        public Task<ServiceResponse<bool>> isHotelAvailable(int hotelId, DateTime startDate, DateTime endDate);
    }
}
