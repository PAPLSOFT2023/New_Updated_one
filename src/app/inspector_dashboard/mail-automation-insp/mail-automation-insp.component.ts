import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mail-automation-insp',
  templateUrl: './mail-automation-insp.component.html',
  styleUrls: ['./mail-automation-insp.component.scss']
})
export class MailAutomationInspComponent {
  unitDetails: any[] = [];
  constructor(private router: Router,private http: HttpClient) {}
  ngOnInit() {
    this.loadUnitDetails();
    console.log('pending',this.unitDetails);
    
    
  }
  loadUnitDetails() {
    this.http.get<any[]>('http://localhost:3000/api/pending') // Replace with your server endpoint
      .subscribe(data => {
        this.unitDetails = data;
      });
  }
  proceed(document_id:string){
    this.router.navigate(['afterlogin', 'unit',document_id]);

    

  }


}
