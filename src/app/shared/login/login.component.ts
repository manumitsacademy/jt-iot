import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../core/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform: FormGroup;
  constructor(private formBuilder: FormBuilder,private aS:AuthenticationService,private router:Router) {
    this.loginform = this.formBuilder.group({
      email :'',
      password :''      
    });
  }
  ngOnInit() {
  }
  login(){
    this.aS.login(this.loginform.value).subscribe((res)=>{

      if(res['msg']=="invalidcredentials"){
        alert("Invalid Credentials")
        this.router.navigate(['']);
      }
      else{
        console.log(res)
        window.localStorage.setItem('token',res['sessionid'])
        window.localStorage.setItem('username',res['username'])
        window.localStorage.setItem('level',res['level'])
        this.aS.emitUserStatus(true)
        this.router.navigate(['home'])
      }      
    })
  }
}
