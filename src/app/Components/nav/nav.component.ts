import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../../app.routes';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-nav',
  standalone:true,
imports:[RouterModule,CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
isLogin: boolean=false;

  constructor(private _AuthService:AuthService) { }


  ngOnInit() {
        this._AuthService.userData.subscribe({
          next:()=>{
            console.log(this._AuthService.userData.getValue())

            if (this._AuthService.userData.getValue() !=null){

              this.isLogin=true
            }
            else{
              this.isLogin=false
            }
          }
        })
      
  

}
logout(){
  this._AuthService.logOut();
}}
