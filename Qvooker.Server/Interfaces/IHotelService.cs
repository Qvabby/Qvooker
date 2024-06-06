using Microsoft.AspNetCore.Mvc;
using Qvooker.Server.Models;
using Qvooker.Server.Models.DTOs;

namespace Qvooker.Server.Interfaces
{
    public interface IHotelService
    {
        /// <summary>
        ///  Adding a specific hotel to a database.
        /// </summary>
        /// <param name="hotelDto"></param>
        /// <returns></returns>
        public Task<ServiceResponse<HotelDTO>> AddHotel([FromForm] HotelDTO hotelDto);
        /// <summary>
        /// Getting Specific hotel data out of database.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Task<ServiceResponse<Hotel>> GetHotel(int id);
    }
}
