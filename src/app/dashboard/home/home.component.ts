import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DevicedataService } from '../../core/devicedata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private http:HttpClient,private ddS:DevicedataService){}
  loginstatus=true;
  data;
  macid;
  h;
  t;
  username;
  motorSwitch:boolean=true;
  deviceStatusFlag;
  deviceDataUnsubscriptionFlag;
  stopGettingDataFlag;
  inletValveStatus=false;
  ngOnInit(){
    this.stopGettingDataFlag=setInterval(this.getDeviceData.bind(this),1000);
    this.username=window.localStorage.getItem('username');
  }
  getDeviceData(){
    this.deviceDataUnsubscriptionFlag=this.ddS.getDeviceData().subscribe((res)=>{
      console.log(res);
      this.data=res;
      this.deviceStatusFlag=res[0].deviceStatus;
      if(res[0].deviceStatus==='true'){      
        this.h=(100-(res[0]['level']/1.65)).toFixed(2);
        this.t=res[0]['level'];
        this.macid=res[0]['mac']
        this.motorSwitch=res[0]['switch'];
        this.inletValveStatus=res[0]['IVS'];
        console.log(this.h,this.t)
      }
    });  
  }
  title = 'myapp';
  gaugeType = "semi";
  humidityLabel = "Water Level";
  humidityAppendText = "%";
  temperatureLabel = "Temperature";
  temperatureAppendText = "C";
  motorRestart(){
    this.http.get(`http://ec2-52-66-255-20.ap-south-1.compute.amazonaws.com:5002/command/0xDE,0xAD,0xBE,0xEF,0xFE,0xEE/${this.motorSwitch}/gubbalapraveen`)
      .subscribe((res)=>{
        console.log(res);
      });
  }
  ngOnDestroy(){
    console.log("DEstro");
    this.deviceDataUnsubscriptionFlag.unsubscribe();
    clearInterval(this.stopGettingDataFlag);
  }
}