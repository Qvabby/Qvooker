import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AccountService } from './account.service';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { HotelListingComponent } from './hotel-listing/hotel-listing.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { AddHotelComponent } from './admin/add-hotel/add-hotel.component';
import { AddRoomComponent } from './admin/add-room/add-room.component';
import { AddAdressComponent } from './admin/add-adress/add-adress.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    WelcomeComponent,
    ProfileComponent,
    HotelListingComponent,
    HotelDetailComponent,
    AddHotelComponent,
    AddRoomComponent,
    AddAdressComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonsModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AccountService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
