import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule,Router  } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone:true,
imports:[RouterModule,CommonModule,FormsModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _AuthService:AuthService , private _Router:Router) { }

  
  error:string = "";
  isLoading = false;
 registerForm: FormGroup= new FormGroup({
  fullname: new FormControl(null,[Validators.required ,Validators.minLength(6),Validators.maxLength(30)]),
  id: new FormControl(null,[Validators.required, Validators.pattern(/^\d{14}$/) ]), 
  department: new FormControl(null ,[Validators.required ]),
  role: new FormControl(null ,[Validators.required ]),
  username: new FormControl(null ,[Validators.required ,]),
  password: new FormControl(null ,[Validators.required ,Validators.minLength(8)]),
 });
 


 submitRegisterForm(registerForm:FormGroup){
  this.isLoading=true;
  console.log(registerForm.value) 
  console.log("tttRegister")
  this._AuthService.register(registerForm.value).subscribe({
    next: (response)=>{
      console.log("vvvvvRegister")

      this.isLoading=false;
      if (response.message ==='success'){
        this._Router.navigate(['/login']);
      }
      else {this.error=response.message; }
    }
  })
 };

       ngOnInit() {
  }

}
