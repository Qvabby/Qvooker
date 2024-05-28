using AutoMapper;
using Qvooker.Server.Models;
using Qvooker.Server.Models.DTOs;

namespace Qvooker.Server
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Add as many of these lines as you need to map your objects
            CreateMap<Adress, AdressDTO>().ReverseMap();
            CreateMap<Room, RoomDTO>().ReverseMap();
            CreateMap<Hotel, HotelDTO>().ReverseMap();
        }
    }
}
