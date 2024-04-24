// import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Component,HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { ApicallService } from 'src/app/apicall.service';

@Component({
  selector: 'app-key-abstract',
  templateUrl: './key-abstract.component.html',
  styleUrls: ['./key-abstract.component.scss']
})
export class KeyAbstractComponent {
  unit:string|null ='';
  document_id:string |null ='';
  contract:string|null='';
  constructor(private route: ActivatedRoute,private dataService:ApicallService, private http:HttpClient) { } 
  ngOnInit(){
    this.unit = this.route.snapshot.paramMap.get('unit');
    this.document_id = this.route.snapshot.paramMap.get('document_id');
    this.contract= this.route.snapshot.paramMap.get('contract_no');
    console.log('document id is',this.document_id);
    console.log('unit is ',this.unit);
    console.log('contract no is ', this.contract);
    }


}