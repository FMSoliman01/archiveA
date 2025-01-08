import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable,BehaviorSubject } from "rxjs";
import {jwtDecode} from 'jwt-decode';
import { Router } from "@angular/router";
@Injectable({
    providedIn:"root"
})

export class AuthService {
    // to check the current user  when   the user is logged in 
    constructor(private _HttpClient: HttpClient,private _Router:Router){
        if (localStorage.getItem("userToken")!=null){
            this.saveUserData();}
    
    }
userData  :any = new BehaviorSubject(null);

// save the user data   to the  local storage   
saveUserData() {
    console.log("first");
    let encodedToken =( localStorage.getItem('userToken')); 
    console.log(localStorage.getItem('userToken') )
    console.log(encodedToken) // Retrieve token correctly
    if (encodedToken) {
        try {
            let decodedToken: object = jwtDecode(encodedToken);
            console.log(decodedToken);
            this.userData.next(decodedToken);
            console.log(this.userData);
        } catch (error) {
            console.error('Invalid token:', error);
            localStorage.removeItem('userToken'); // Clear invalid token
        }
    } else {
        console.error('No token found in localStorage.');
    }
}


//  sign functions 
    register(userData:object):Observable<any>{
     return   this._HttpClient.post('http://localhost:8001/user/addUser',userData);}
     login(userData:object):Observable<any>{
        return   this._HttpClient.post('http://localhost:8001/user/login',userData);}
    // login(data: any): Observable<LoginResponse> {
    //     return this.http.post<LoginResponse>('http://localhost:8001/user/login', data);
    //   }
    logOut(){
        localStorage.removeItem('userToken');
        this.userData.next(null);
        this._Router.navigate(['/login']);   
        console.log(this.userData)
    }

} 
export interface LoginResponse{
    message:string;
    token?:string;
}
export interface RegisterResponse{
    message:string;
    token?:string;
}