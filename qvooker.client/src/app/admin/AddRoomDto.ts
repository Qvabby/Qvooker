export interface AddRoomDto {
  name: string,
  description: string,
  price: number
  RoomImages: File[] | null;
}
