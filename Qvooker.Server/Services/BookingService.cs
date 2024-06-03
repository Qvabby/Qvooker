using Microsoft.EntityFrameworkCore;
using Qvooker.Server.Data;
using Qvooker.Server.Interfaces;
using Qvooker.Server.Models;
using Qvooker.Server.Models.DTOs;

namespace Qvooker.Server.Services
{
    public class BookingService : IBookingService
    {
        private readonly QvookerDbContext _dbContext;

        public BookingService(QvookerDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<ServiceResponse<UserRoomBooking>> BookRoomAsync(BookRoomDTO model)
        {
            ServiceResponse<UserRoomBooking> response = new ServiceResponse<UserRoomBooking>();
            try
            {
                var bookavailable = await isHotelAvailable(model);
                if (!bookavailable.Data)
                {
                    response.ServiceSuccess = false;
                    response.Description = "Room isn't available.";
                    //response.essentialData = "NotAvailable";
                    return response;
                }
                var booking = new UserRoomBooking()
                {
                    QvookerUserId = model.UserId,
                    HotelId = model.HotelId,
                    RoomId = model.RoomId,
                    StartDate = model.StartDate,
                    EndDate = model.EndDate
                };

                await _dbContext.UserRoomBookings.AddAsync(booking);
                await _dbContext.SaveChangesAsync();

                response.Data = booking;
                response.Description = "Successfully Booked Room.";
                response.ServiceSuccess = true;
                return response;
            }
            catch (Exception e)
            {
                response.ServiceSuccess = false;
                response.errorMessage = e.Message;
                response.Description = $"Exception has been caught: {e.InnerException}";
                return response;
            }
        }

        public async Task<ServiceResponse<bool>> isHotelAvailable(BookRoomDTO model)
        {
            ServiceResponse<bool> Response = new ServiceResponse<bool>();

            try
            {
                bool isBooked = await _dbContext.UserRoomBookings.AnyAsync(x =>
                            x.RoomId == model.RoomId && ((model.StartDate >= x.StartDate && model.StartDate < x.EndDate) ||
                            (model.EndDate > x.StartDate && model.EndDate <= x.EndDate) ||
                            (model.StartDate < x.StartDate && model.EndDate > x.EndDate)
                            ));

                Response.ServiceSuccess = true;
                Response.Description = "Successfully retrived data from base, if hotel is avialable or not.";
                

                if (isBooked) { 
                    Response.Data = false;
                    return Response;
                }
                else
                {
                    Response.Data = true;
                    return Response;
                }
            }
            catch (Exception e)
            {
                Response.ServiceSuccess = false;
                Response.errorMessage = e.Message;
                return Response;
            }


        }
    }
}
