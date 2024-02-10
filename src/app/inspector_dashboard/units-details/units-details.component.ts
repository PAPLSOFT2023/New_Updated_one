import { Component,Inject } from '@angular/core';
import { ApicallService } from 'src/app/apicall.service';
// import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DatePipe } from '@angular/common';
import { HttpClient ,HttpErrorResponse,HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-units-details',
  templateUrl: './units-details.component.html',
  styleUrls: ['./units-details.component.scss']
})
export class UnitsDetailsComponent {
  val: string | null = ''; 
  // repeatCount=this.dataService.recordCount;

moving_walk_fieldValues: string[] = [];

updateLiftFieldValue(index: number, value: string) {
  this.moving_walk_fieldValues[index] = value;
}
  
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private route: ActivatedRoute,private dataService: ApicallService,private http :HttpClient) {
    // this.route.paramMap.subscribe(params => {
    //   this.val = params.get('c_no');
    //   console.log(this.val);
      
    // });

    dataService.unit_values= this.moving_walk_fieldValues;
    this.val=this.data.val;
    console.log('final val is ',this.val);
    

  }
  arrayFromVal(): any[] {
    return Array.from({ length: Number(this.val) });
  }
  
  ngOnInit() {
   
  }

  
  

  
 
}

// repeatCount=this.dataService.moving_walk;
// moving_walk_fieldValues: string[] = [];

// updateLiftFieldValue(index: number, value: string) {
//   this.moving_walk_fieldValues[index] = value;
// }


// constructor(private dataService: ApicallService,private http :HttpClient ){


//   dataService.moving_walk_values= this.moving_walk_fieldValues;
  
  
 
  
  


// }
