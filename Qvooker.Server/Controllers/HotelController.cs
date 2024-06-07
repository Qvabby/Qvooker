using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Qvooker.Server.Data;
using Qvooker.Server.Models;
using Qvooker.Server.Models.DTOs;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;
using Qvooker.Server.Interfaces;

namespace Qvooker.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly QvookerDbContext _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IHotelService _hotelService;
        public HotelController(QvookerDbContext context, IMapper mapper, IWebHostEnvironment hostingEnvironment, IHotelService hotelService)
        {
            _context = context;
            _mapper = mapper;
            _hostingEnvironment = hostingEnvironment;
            _hotelService = hotelService;
        }

        // GET: api/Hotel
        [HttpGet]
        public async Task<IEnumerable<Hotel>> GetHotels()
        {
            return await _context.Hotels.Include(x => x.HotelAdresses).Include(x => x.Rooms).Include(x => x.HotelImages).ToListAsync();
        }

        // GET: api/Hotel/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Hotel>> GetHotel(int id)
        {
            //getting Response.
            ServiceResponse<Hotel> response = await _hotelService.GetHotel(id);
            //depending on response generating respond.
            if (!response.ServiceSuccess)
            {
                return NotFound();
            }
            if (response.ServiceSuccess)
            {
                return Ok(response.Data);
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT: api/Hotel/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHotel(int id, Hotel hotel)
        {
            if (id != hotel.HotelId)
            {
                return BadRequest();
            }

            _context.Entry(hotel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HotelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Hotel
        [Authorize]
        [HttpPost, DisableRequestSizeLimit]
        public async Task<ActionResult<Hotel>> postHotel([FromForm] HotelDTO hotelDto)
        {
            //getting Response.
            ServiceResponse<Hotel> response = await _hotelService.AddHotel(hotelDto);
            //depending on response generating respond.
            if (!response.ServiceSuccess)
            {
                return NotFound(response);
            }
            if (response.ServiceSuccess)
            {
                return Ok(response.Data);
            }
            else
            {
                return BadRequest(response);
            }
        }

        // DELETE: api/Hotel/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHotel(int id)
        {
            var hotel = await _context.Hotels.FindAsync(id);
            if (hotel == null)
            {
                return NotFound();
            }

            _context.Hotels.Remove(hotel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HotelExists(int id)
        {
            return _context.Hotels.Any(e => e.HotelId == id);
        }
    }
}
