import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-addcompany',
  templateUrl: './addcompany.component.html',
  styleUrls: ['./addcompany.component.css']
})
export class AddcompanyComponent implements OnInit {

  constructor(private fb:FormBuilder,private cS:CompanyService) { }
  companyForm:FormGroup;
  
  ngOnInit() {
    this.companyForm = this.fb.group({
      companyname:'manumits',
      address:'f6 aaimata',
      gstnumber:'123asd',
      email:'asdas@asd.com',
      contactperson:'praveen',
      phonenumber:'121212'
    })
  }
  addCompany(){
    this.cS.addCompany(this.companyForm.value).subscribe((res)=>{
      console.log(res);
    });
  }
}
