import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { DataService } from 'src/app/data.service';
import { ApicallService } from 'src/app/apicall.service';

@Component({
  selector: 'app-cartop',
  templateUrl: './cartop.component.html',
  styleUrls: ['./cartop.component.scss']
})
export class CartopComponent {
  video: any;
  val:string | null='';
  name:string | null ='';
  document_id:string | null ='';
  unit_no:string|null='';
  constructor(private route: ActivatedRoute,private dataService: ApicallService,private http :HttpClient,private router:Router){
    this.route.paramMap.subscribe(params => {
     this.val = params.get('c_no');
     console.log(this.val);
     
   });

 }
 ngOnInit(){
  this.document_id = sessionStorage.getItem('document_id');
  console.log('document id is ',this.document_id);
  this.unit_no=sessionStorage.getItem('unit_no');
  console.log('unit number is',this.unit_no);
  console.log('section is ',this.val);
  this.name = sessionStorage.getItem('UserName') as string;
  console.log('inspector name',this.name);

  }

}
