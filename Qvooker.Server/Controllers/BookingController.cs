using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Qvooker.Server.Interfaces;
using Qvooker.Server.Models;
using Qvooker.Server.Models.DTOs;

namespace Qvooker.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [Authorize]
        [HttpPost("BookRoom")]
        public async Task<IActionResult> BookRoom(BookRoomDTO model)
        {
            ServiceResponse<UserRoomBooking> serviceResponse = await _bookingService.BookRoomAsync(model);

            if (serviceResponse.ServiceSuccess)
            {
                return Ok(serviceResponse);
            }
            return BadRequest(serviceResponse);
        }
    }
}
