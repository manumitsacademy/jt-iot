import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public as:AuthenticationService) { }
  loginstatus=false;
  ngOnInit() {
    this.as.userStatusEvent$.subscribe((res)=>{     
      this.loginstatus=res.loginstatus;
    });
  }
  logout(){
    this.as.emitUserStatus(false);
  }

}
