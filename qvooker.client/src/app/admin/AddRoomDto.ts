export interface AddRoomDto {
  name: string,
  description: string,
  price: number
  roomImages: File[] | null;
}
