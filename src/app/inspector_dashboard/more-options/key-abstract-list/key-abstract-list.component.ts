import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-key-abstract-list',
  templateUrl: './key-abstract-list.component.html',
  styleUrls: ['./key-abstract-list.component.scss']
})
export class KeyAbstractListComponent {
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
  proceed(document_id:string,contract_number:string){
    sessionStorage.setItem('contract',contract_number);
    
    this.router.navigate(['afterlogin', 'key_abstract_units',document_id,contract_number]);

    

  }

}
