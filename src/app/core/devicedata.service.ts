import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DevicedataService {

  constructor(public http:HttpClient) { }
  getDeviceData(){
    return this.http.get("http://ec2-52-66-255-20.ap-south-1.compute.amazonaws.com:4000/getDeviceData/0xDE,0xAD,0xBE,0xEF,0xFE,0xEE")
  }
}

    