import { Component, EventEmitter, Output } from '@angular/core';
import { AddAdressDto } from '../AddAdressDto';

@Component({
  selector: 'app-add-adress',
  templateUrl: './add-adress.component.html',
  styleUrl: './add-adress.component.css'
})
export class AddAdressComponent {
  @Output() adressAdded = new EventEmitter<AddAdressDto>();
  address: AddAdressDto = {
    country: '',
    city: '',
    street: ''
  };
  constructor() { }



  addAddress() {
    this.adressAdded.emit(this.address); // Emit the adress data to the parent component
    this.resetForm();
  }



  resetForm() {
    this.address = {
      country: '',
      city: '',
      street: ''
    };
  }

  cancel() {
    this.adressAdded.emit();
  }
}
