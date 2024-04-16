import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-upload-certificate',
  templateUrl: './upload-certificate.component.html',
  styleUrls: ['./upload-certificate.component.scss']
})
export class UploadCertificateComponent {
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
  proceed(document_id:string,contract_number:string,building_name:string){
    sessionStorage.setItem('contract',contract_number);
    sessionStorage.setItem('building_name',building_name);
    
    this.router.navigate(['afterlogin', 'upload_certificate',document_id]);

    

  }

}
