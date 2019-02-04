import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private http:HttpClient){}
  loginstatus=true;
  data;
  macid;
  h;
  t;
  motorSwitch:boolean=true;
  deviceStatusFlag;
  ngOnInit(){
    setInterval(this.getDeviceData.bind(this),3000);
  }
  getDeviceData(){
    this.http.get("http://ec2-52-66-255-20.ap-south-1.compute.amazonaws.com:4000/getDeviceData/0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED")
    .subscribe((res)=>{
      console.log(res);
      this.data=res;
      this.deviceStatusFlag=res[0].deviceStatus;
      if(res[0].deviceStatus==='connected'){      
        this.h=res[0]['h'].toFixed(2);
        this.t=res[0]['t'].toFixed(2);
        this.motorSwitch=res[0]['LED'];
        console.log(this.h,this.t)
      }
    });
  
  }
  title = 'myapp';
  gaugeType = "semi";
  humidityLabel = "Humidity";
  humidityAppendText = "%";
  temperatureLabel = "Temperature";
  temperatureAppendText = "C";
  motorRestart(){
    this.http.get(`http://ec2-52-66-255-20.ap-south-1.compute.amazonaws.com:5002/command/0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED/${this.motorSwitch}/gubbalapraveen`)
      .subscribe((res)=>{
        console.log(res)
        setInterval(this.getDeviceData.bind(this),100);
      });
  }

}