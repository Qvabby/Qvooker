import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelListingComponent } from './hotel-listing.component';

describe('HotelListingComponent', () => {
  let component: HotelListingComponent;
  let fixture: ComponentFixture<HotelListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotelListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
