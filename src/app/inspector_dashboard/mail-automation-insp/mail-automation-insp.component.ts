import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mail-automation-insp',
  templateUrl: './mail-automation-insp.component.html',
  styleUrls: ['./mail-automation-insp.component.scss']
})
export class MailAutomationInspComponent {
  name:string|null ='';
  unitDetails: any[] = [];
  constructor(private router: Router,private http: HttpClient) {}
  ngOnInit() {
    this.loadUnitDetails();
    console.log('pending',this.unitDetails);
    this.name = sessionStorage.getItem('UserName') as string;
    
    
    
  }
  loadUnitDetails() {
    const value = sessionStorage.getItem('UserName') as string;
    console.log('inspector name is',value);
    
    const inspector = `http://localhost:3000/api/pending?encodedValue=${value}`;
    this.http.get<any[]>(inspector) // Replace with your server endpoint
      .subscribe(data => {
        this.unitDetails = data;
      });
  }
  proceed(document_id:string){
    sessionStorage.setItem('document_id',document_id);
    this.router.navigate(['afterlogin', 'unit',document_id]);

    

  }


}
