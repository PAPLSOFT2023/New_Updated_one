import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { DataService } from 'src/app/data.service';
import { ApicallService } from 'src/app/apicall.service';

@Component({
  selector: 'app-listing-units',
  templateUrl: './listing-units.component.html',
  styleUrls: ['./listing-units.component.scss']
})
export class ListingUnitsComponent {
  val:string | null='';
  units:string[] | any=[];
  constructor(private route: ActivatedRoute,private dataService: ApicallService,private http :HttpClient,private router:Router){
     this.route.paramMap.subscribe(params => {
      this.val = params.get('c_no');
      console.log(this.val);
      if (this.val) {
        // sessionStorage.setItem('document_id', this.val); 
      }


      
    });

  }
  

ngOnInit(){
  
  const value=this.val

  
  const inspector = `http://localhost:3000/api/fetch_units?encodedValue=${value}`;

this.http.get<string[]>(inspector).subscribe(
  (data: string[]) => {
    this.units = JSON.parse(data[0]); // Assuming the response is always an array with one element
    console.log(this.units);
    console.log('my data is',data);
  },
  error => {
    console.error(error);
  }
);



}
proceed(unit: string) {
  console.log("Clicked on unit:", unit);

  if (unit) {
    this.router.navigate(['afterlogin', 'section', unit]).then(
      () => console.log('Navigation successful'),
      (error) => console.error('Navigation failed:', error)
    );
  } else {
    console.error('Invalid unit value:', unit);
  }
}

  

}
