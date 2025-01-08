import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';
import { routes } from './app.routes'; // استيراد المسارات
import { AppRoutingModule } from './app.routes';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { SearchComponent } from './Components/Search/Search.component';
import { AddComponent } from './Components/add/add.component';
import { NavComponent } from './Components/nav/nav.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { RegisterComponent } from './Components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    // LoginComponent,
    HomeComponent,
  ],
  imports: [
    // HttpClientModule,
    // AppComponent,
    // NavComponent,
    // FooterComponent,

   BrowserModule,

   RouterModule,
   AppRoutingModule,
   RouterOutlet,
   BrowserAnimationsModule,
   ReactiveFormsModule ,
   RouterModule,
  FormsModule,
  CommonModule
  ],
  providers:[provideHttpClient()]
  // bootstrap: [AppComponent],
  // bootstrapApplication(AppComponent);

})
export class AppModule { }
