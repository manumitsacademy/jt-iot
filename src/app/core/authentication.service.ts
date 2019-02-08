import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userStatusEvent$;
  constructor(public http:HttpClient) { 
    this.userStatusEvent$=new EventEmitter();
  }
  login(credentials){
    return this.http.post('http://localhost:4000/login',credentials)    
  }
  signup(credentials){
    return this.http.post('http://localhost:4000/signup',credentials)    
  }
  emitUserStatus(status){    
    this.userStatusEvent$.emit({loginstatus:status});
  }
}
