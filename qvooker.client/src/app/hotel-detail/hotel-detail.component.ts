import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../hotel.service';
import { BookRoomDTO, BookingService } from '../booking.service';
import { AccountService } from '../account.service';


interface RoomAndImagesMap {
  [roomId: number]: string[]; // Map each room ID to an array of image URLs
}

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {
  //Hotel Instance and infos.
  hotel: any = [];
  hotelId: number = 0;
  selectedRoom: any = null;
  startDate: string = '';
  endDate: string = '';
  totalCost: number | null = null;
  userId: string = '';
  //dragging
  isDragging = false;
  startX = 0;
  startY = 0;
  initialX = 0;
  initialY = 0;
  modalElement: HTMLElement | null = null;
  modalStyle = {};
  originalWidth: string = '';
  originalHeight: string = '';
  //carrousel
  //carouselRoomIds: number[] = [];
  //carouselImages: string[] = [];
  //yourRoomAndImagesMap: RoomAndImagesMap[] = [];
  //constructor and a dependency injection.
  constructor(private route: ActivatedRoute, private hotelService: HotelService, private bookingService: BookingService, private accountService: AccountService, private router: Router, private renderer: Renderer2) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.hotelId = +params['hotelId']
      this.getHotelDetails();
      this.getUserInfo(); // Fetch user info when component initializes

      //console.log(`Check Hotel instance: ${this.hotel}`)
    })
  }
  //getting User Information from service.
  getUserInfo() {
    this.accountService.getUserInfo().subscribe(
      data => {
        this.userId = data.userId; // Extract userId from the response
        //console.log(`User ID:`, this.userId);
      },
      error => {
        console.error('Error fetching user info:', error);
      }
    );
  }
  //getting Hotel Information from service.
  getHotelDetails() {
    this.hotelService.getHotel(this.hotelId).subscribe(
      data => {
        this.hotel = data;
        console.log(`Hotel details:`, this.hotel);



        this.populateCarouselData(this.hotel.rooms);
      },
      error => {
        console.error('Error fetching hotel details:', error);
      }
    )
  }
  //on book now.
  selectRoom(room: any) {
    this.selectedRoom = room;
    this.startDate = '';
    this.endDate = '';
    this.totalCost = null;
  }
  //method of calculating the Price.
  calculateTotalCost() {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      this.totalCost = diffDays * this.selectedRoom.price;
    }
  }
  //Final Booking.
  confirmBooking() {
    if (this.startDate && this.endDate) {
      const booking: BookRoomDTO = {
        userId: this.userId,
        hotelId: this.hotelId,
        roomId: this.selectedRoom.roomId,
        startDate: new Date(this.startDate),
        endDate: new Date(this.endDate)
      };
      //send request.
      this.bookingService.bookRoom(booking).subscribe(
        response => {
          //console.log('Room booked successfully:', response);
          this.router.navigate(["/profile"])
        },
        error => {
          console.error('Error booking room:', error);
        }
      );
    }
  }
  //to cancel Booking
  cancelBooking() {
    this.selectedRoom = null;
    this.startDate = '';
    this.endDate = '';
    this.totalCost = null;
  }

  startDrag(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.modalElement = (event.target as HTMLElement).closest('.modal-dialog');
    if (this.modalElement) {
      const rect = this.modalElement.getBoundingClientRect();
      this.initialX = rect.left;
      this.initialY = rect.top;
      this.originalWidth = `${rect.width}px`;
      this.originalHeight = `${rect.height}px`;
      this.renderer.setStyle(this.modalElement, 'position', 'absolute');
      this.renderer.setStyle(this.modalElement, 'z-index', '1050'); // Ensure it stays above other elements
      this.renderer.setStyle(this.modalElement, 'width', this.originalWidth);
      this.renderer.setStyle(this.modalElement, 'height', this.originalHeight);

      const dx = event.clientX - this.startX;
      const dy = event.clientY - this.startY;
      const newX = this.initialX + dx;
      const newY = this.initialY + dy - 22;
      this.renderer.setStyle(this.modalElement, 'left', `${newX}px`);
      this.renderer.setStyle(this.modalElement, 'top', `${newY}px`);

      this.renderer.addClass(this.modalElement, 'dragging'); // Add class for dragging cursor
    }
  }

  stopDrag() {
    this.isDragging = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.drag(event);
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    if (this.modalElement) {
      this.renderer.removeClass(this.modalElement, 'dragging'); // Remove class when drag stops
    }
    this.stopDrag();
  }

  drag(event: MouseEvent) {
    if (this.isDragging && this.modalElement) {
      const dx = event.clientX - this.startX;
      const dy = event.clientY - this.startY;
      const newX = this.initialX + dx;
      const newY = this.initialY + dy - 22;
      this.renderer.setStyle(this.modalElement, 'left', `${newX}px`);
      this.renderer.setStyle(this.modalElement, 'top', `${newY}px`);
    }
  }
  //carousel
  populateCarouselData(roomsForCarousel: any[]) {
    this.carouselImages = []; // Clear existing carousel images
    this.carouselRoomIds = []; // Clear existing carousel room IDs

    roomsForCarousel.forEach((room: any) => { // Iterate over each room
      room.roomImages.forEach((image: any) => { // Iterate over the images of the room
        this.carouselImages.push(image.imageUrl); // Push the image URL to the carousel images array
        this.carouselRoomIds.push(room.roomId); // Push the room ID to the carousel room IDs array
      });
    });
    console.log(this.carouselImages);
    console.log(this.carouselRoomIds);
  }


}
