import { Component, EventEmitter, Output } from '@angular/core';
import { AddAdressDto } from '../AddAdressDto';

@Component({
  selector: 'app-add-adress',
  templateUrl: './add-adress.component.html',
  styleUrl: './add-adress.component.css'
})
export class AddAdressComponent {
  //to connect add adress component to add hotel component.
  @Output() adressAdded = new EventEmitter<AddAdressDto>();
  //creating address instance.
  address: AddAdressDto = {
    country: '',
    city: '',
    street: ''
  };
  constructor() { }
  //addAddress and reset form.
  addAddress() {
    this.adressAdded.emit(this.address); // Emit the adress data to the parent component
    this.resetForm();
  }
  //reset Form method.
  resetForm() {
    this.address = {
      country: '',
      city: '',
      street: ''
    };
  }
  //if we want to cancel adding address.
  cancel() {
    this.adressAdded.emit();
  }
}
