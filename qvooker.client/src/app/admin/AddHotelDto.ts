import { AddAdressDto } from "./AddAdressDto";
import { AddRoomDto } from "./AddRoomDto";

export interface AddHotelDto {
  hotelName: string;
  stars: number;
  hotelAdresses: AddAdressDto[] | null;
  rooms: AddRoomDto[] | null;
  HotelImages: File[] | null; 
}
