import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HotelCategoryComponent } from './hotel-category/hotel-category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { BannerSettingComponent } from './banner-setting/banner-setting.component';
import { MaterialModule } from './material/material.module';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { BookRoomComponent } from './book-room/book-room.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { PaymentComponent } from './payment/payment.component';
import { DialogComponent } from './dialog/dialog.component';
import { Angular4PaystackModule } from 'angular4-paystack';
import { MultiplyPipe } from './pipes/multiply.pipe';
import { AllBookingsComponent } from './all-bookings/all-bookings.component';
import { RecentVisitComponent } from './recent-visit/recent-visit.component';
import { VisitFilterPipe } from './pipes/visit-filter.pipe';
import { VerifyPaymentComponent } from './verify-payment/verify-payment.component';
import { BookingsFilterPipe } from './pipes/bookings-filter.pipe';
import { AdminLoginComponent } from './admin-login/admin-login.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavbarComponent,
    CarouselComponent,
    LoginComponent,
    RegisterComponent,
    HotelCategoryComponent,
    AdminComponent,
    BannerSettingComponent,
    RoomDetailsComponent,
    BookRoomComponent,
    UserComponent,
    DashboardComponent,
    TransactionHistoryComponent,
    PaymentComponent,
    DialogComponent,
    MultiplyPipe,
    AllBookingsComponent,
    RecentVisitComponent,
    VisitFilterPipe,
    VerifyPaymentComponent,
    BookingsFilterPipe,
    AdminLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    Angular4PaystackModule.forRoot('pk_test_bfe3a2fb617743847ecf6d9ea96e3153e2a1186d')
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
