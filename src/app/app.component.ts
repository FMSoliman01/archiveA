import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./Components/nav/nav.component";
import { FooterComponent } from './Components/footer/footer.component';



import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable,BehaviorSubject } from "rxjs";
import {jwtDecode} from 'jwt-decode';
import { Router } from "@angular/router";
@Component({
  selector: 'app-root', 

  imports: [RouterOutlet, NavComponent,
     FooterComponent
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone:true,

})
export class AppComponent {
  title = 'archive-app';
}
 