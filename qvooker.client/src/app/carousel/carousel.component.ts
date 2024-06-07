import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  @Input() images: string[] = [];
  @Input() hotelIds: number[] = [];
  activeIndex = 0;
  constructor() { }

  ngOnInit(): void {
  }

  nextSlide() {
    this.activeIndex = (this.activeIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.activeIndex = (this.activeIndex - 1 + this.images.length) % this.images.length;
  }
}
