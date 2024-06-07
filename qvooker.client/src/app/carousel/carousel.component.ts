import { Component, Input, input } from '@angular/core';



//interface RoomAndImagesMap {
//  [roomId: number]: string[]; // Define each room ID as a key with an array of image URLs
//}
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})

export class CarouselComponent {
  @Input() images: string[] = [];
  @Input() hotelIds: number[] = [];
/*  @Input() roomAndImagesMap: RoomAndImagesMap[] = [];*/
  activeIndex = 0;
  constructor() { }

  ngOnInit(): void {
  }

  nextSlide() {
    this.activeIndex = (this.activeIndex + 1) % this.images.length; // Use 'images' array instead of 'roomImages'
  }

  prevSlide() {
    this.activeIndex = (this.activeIndex - 1 + this.images.length) % this.images.length; // Use 'images' array instead of 'roomImages'
  }

  //get roomIds(): number[] {
  //  return Object.keys(this.roomAndImagesMap).map(Number);
  //}

  //get roomImages(): string[] {
  //  const roomId = this.roomIds[this.activeIndex];
  //  const roomAndImages = this.roomAndImagesMap.find(item => item[roomId] !== undefined);
  //  return roomAndImages ? roomAndImages[roomId] : [];
  //}
}
