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

namespace Qvooker.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly QvookerDbContext _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public HotelController(QvookerDbContext context, IMapper mapper, IWebHostEnvironment hostingEnvironment)
        {
            _context = context;
            _mapper = mapper;
            _hostingEnvironment = hostingEnvironment;
        }

        // GET: api/Hotel
        [HttpGet]
        public async Task<IEnumerable<Hotel>> GetHotels()
        {
            return await _context.Hotels.Include(x => x.HotelAdresses).Include(x => x.Rooms).ToListAsync();
        }

        // GET: api/Hotel/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Hotel>> GetHotel(int id)
        {
            var hotel = await _context.Hotels
                .Include(x => x.HotelImages)
                .Include(x => x.Rooms)
                .Include(X => X.BookedRooms)
                .ThenInclude(x => x.Room.RoomImages)
                .Include(x => x.HotelAdresses)
                .FirstOrDefaultAsync(x => x.HotelId == id);

            if (hotel == null)
            {
                return NotFound();
            }

            return Ok(hotel);
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
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Hotel>> PostHotel([FromForm] HotelDTO hotelDto)
        {

            try
            {
                //creating hotel entity
                var hotel = new Hotel
                {
                    HotelName = hotelDto.HotelName,
                    Stars = hotelDto.Stars,
                    HotelAdresses = hotelDto.HotelAdresses?.Select(x => _mapper.Map<Adress>(x)).ToList(),
                    Rooms = new List<Room>(), // Initialize room collection
                    HotelImages = new List<HotelImage>() // Initialize hotel image collection
                };
                // Save hotel entity to database
                _context.Hotels.Add(hotel);
                await _context.SaveChangesAsync();

                // Save hotel images to folder and create URLs
                var hotelImageUrls = await SaveImagesAndGetUrls(hotelDto.HotelImages);

                // Create HotelImage entities and associate them with the hotel
                foreach (var imageUrl in hotelImageUrls)
                {
                    var hotelImage = new HotelImage
                    {
                        ImageUrl = imageUrl,
                        HotelId = hotel.HotelId
                    };
                    _context.HotelImages.Add(hotelImage);
                }

                // Save room entities with images
                foreach (var roomDto in hotelDto.Rooms)
                {
                    var room = new Room
                    {
                        Name = roomDto.Name,
                        Description = roomDto.Description,
                        price = roomDto.price,
                        HotelId = hotel.HotelId
                    };

                    hotel.Rooms.Add(room);
                    _context.Rooms.Add(room);
                    await _context.SaveChangesAsync();

                    var roomImageUrls = await SaveImagesAndGetUrls(roomDto.RoomImages);

                    // Create RoomImage entities and associate them with the room
                    foreach (var imageUrl in roomImageUrls)
                    {
                        var roomImage = new RoomImage
                        {
                            ImageUrl = imageUrl,
                            RoomId = room.RoomId
                        };
                        _context.RoomImages.Add(roomImage);
                    }
                }

                // Save changes to the database
                await _context.SaveChangesAsync();

                // Return the created hotel entity
                return CreatedAtAction("GetHotel", new { id = hotel.HotelId }, hotel);


                //var Hotel = _mapper.Map<Hotel>(hotel);
                //_context.Hotels.Add(Hotel);
                //await _context.SaveChangesAsync();

                //return CreatedAtAction("GetHotel", new { id = Hotel.HotelId }, hotel);



            }
            catch (Exception ex)
            {

                throw;
            }

            
        }
        private async Task<List<string>> SaveImagesAndGetUrls(ICollection<IFormFile> imageFiles)
        {
            var imageUrls = new List<string>();
            foreach (var formFile in imageFiles)
            {
                if (formFile.Length > 0)
                {
                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + formFile.FileName;
                    var filePath = Path.Combine(_hostingEnvironment.WebRootPath, "images", uniqueFileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await formFile.CopyToAsync(stream);
                    }

                    // Create URL for the saved image
                    var imageUrl = Path.Combine("/images", uniqueFileName).Replace("\\", "/");
                    imageUrls.Add(imageUrl);
                }
            }
            return imageUrls;
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
