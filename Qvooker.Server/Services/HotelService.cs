using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Qvooker.Server.Data;
using Qvooker.Server.Interfaces;
using Qvooker.Server.Models;
using Qvooker.Server.Models.DTOs;

namespace Qvooker.Server.Services
{
    public class HotelService : IHotelService
    {
        private readonly QvookerDbContext _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public HotelService(QvookerDbContext context, IMapper mapper, IWebHostEnvironment hostingEnvironment)
        {
            _context = context;
            _mapper = mapper;
            _hostingEnvironment = hostingEnvironment;
        }

        public async Task<ServiceResponse<Hotel>> AddHotel([FromForm] HotelDTO hotelDto)
        {
            //creating service's response instance.
            ServiceResponse<Hotel> serviceResponse = new ServiceResponse<Hotel>();
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
                //Configure service Response
                serviceResponse.ServiceSuccess = true;
                var gettingHotel = await GetHotel(hotel.HotelId);
                serviceResponse.Data = gettingHotel.Data;
                // Return the service Response.
                return serviceResponse;
            }
            catch (Exception e)
            {
                //In case there is an error.
                serviceResponse.errorMessage = e.Message;
                serviceResponse.ServiceSuccess = false;
                serviceResponse.Description = e.InnerException?.ToString();
                return serviceResponse;
            }

        }
        public async Task<ServiceResponse<Hotel>> GetHotel(int id)
        {
            //creating service response's instance.
            ServiceResponse<Hotel> serviceResponse = new ServiceResponse<Hotel>();
            try
            {
                //getting hotel data out of context.
                var hotel = await _context.Hotels
                .Include(x => x.HotelImages)
                .Include(x => x.Rooms)
                .Include(X => X.BookedRooms)
                .ThenInclude(x => x.Room.RoomImages)
                .Include(x => x.HotelAdresses)
                .FirstOrDefaultAsync(x => x.HotelId == id);
                //Configuring Service Response.
                serviceResponse.Data = hotel;
                serviceResponse.ServiceSuccess = true;
                serviceResponse.Description = "successfully retrived hotel data from database.";
                return serviceResponse;
            }
            catch (Exception e)
            {
                //in case there is an error.
                serviceResponse.errorMessage = e.Message;
                serviceResponse.Description = e.InnerException?.ToString();
                serviceResponse.ServiceSuccess = false;
                return serviceResponse;
            }
        }

        /// <summary>
        /// This method is to get Images save them in folder and return their Urls.
        /// </summary>
        /// <param name="imageFiles"></param>
        /// <returns></returns>
        private async Task<List<string>> SaveImagesAndGetUrls(ICollection<IFormFile> imageFiles)
        {
            //(../../assets/Media/images/)
            //Creating Collection of Images Urls
            var imageUrls = new List<string>();
            foreach (var formFile in imageFiles)
            {
                if (formFile.Length > 0)
                {
                    var customImagePath = "..\\qvooker.client\\src\\assets\\media";
                    //creating Savable Name
                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + formFile.FileName;
                    var filePath = Path.Combine(customImagePath, "images", uniqueFileName);
                    Directory.CreateDirectory(Path.GetDirectoryName(filePath));
                    //saving
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await formFile.CopyToAsync(stream);
                    }
                    // Create URL for the saved image
                    var imageUrl = Path.Combine("..\\..\\assets\\Media\\", "images", uniqueFileName).Replace("\\", "/");
                    imageUrls.Add(imageUrl);
                }
            }
            //returning Urls
            return imageUrls;
        }
    }
}
