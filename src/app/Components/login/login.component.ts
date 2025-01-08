import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../../app.routes';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone:true,
imports:[FormsModule,RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  constructor(private _AuthService:AuthService ,private _Router:Router) { }

  
  error:string = "";
  isLoading = false;
 loginForm: FormGroup= new FormGroup({
 
  username: new FormControl(null ,[Validators.required , ]),
  password: new FormControl(null ,[Validators.required ,Validators.minLength(8)]),
 });
 


 submitLoginForm(loginForm:FormGroup){

  this.isLoading=true;

  this._AuthService.login(loginForm.value).subscribe({
    next: (response)=>{
      this.isLoading=false;
      console.log("first")
      if (response.message ==='Login successful'){
        console.log(response)

          localStorage.setItem('userToken', response.token);
          this._AuthService.saveUserData();
              this._Router.navigate(['/home']);}

      else {this.error=response.message; }
    },error:(err)=>{
      this.isLoading=false;
      this.error='حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة لاحقًا.';
      console.error(err);}
    
  })
 };

  ngOnInit() { this._AuthService.userData.subscribe({
    next:()=>{
      if (this._AuthService.userData.getValue() !=null){
        this._Router.navigate(['/home']);

      }
      else{
      }
    } 
  })

  }
}
