import { Component,OnInit } from '@angular/core';
// import { DataService } from '../data.service';
import { ApicallService } from 'src/app/apicall.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inspection-inf',
  templateUrl: './inspection-inf.component.html',
  styleUrls: ['./inspection-inf.component.css']
})
export class InspectionInfComponent {
  public contract_nos: string[] = [];
  constructor(private dataService:ApicallService,private router:Router){

  }

  handleClick(c_no: string) {
    // Handle the click event here
    const encodedValue = encodeURIComponent(c_no);
    this.router.navigate(['afterlogin/inspection_inf', encodedValue]);
  }

  ngOnInit(){
    this.dataService.getContractNo().subscribe((data: string[]) => {
      this.contract_nos = data;
    });
  }



  

}
