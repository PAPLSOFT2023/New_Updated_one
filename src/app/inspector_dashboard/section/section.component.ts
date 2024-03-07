import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { DataService } from 'src/app/data.service';
import { ApicallService } from 'src/app/apicall.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {
  val:string | null='';
  units:string[] | any=[];
  constructor(private route: ActivatedRoute,private dataService: ApicallService,private http :HttpClient,private router:Router){
     this.route.paramMap.subscribe(params => {
      this.val = params.get('c_no');
      console.log(this.val);
      if (this.val) {
        sessionStorage.setItem('unit_no', this.val); 
      }
      
    });

  }
  ngOnInit(){
    this.http.get<string[]>('http://localhost:3000/api/fetch_section').subscribe((data) => {
      this.units = data;
      console.log(this.units);
      
    });
  }
  proceed(unit: string) {
    console.log("Clicked on unit:", unit);
  
    if (unit) {
      this.router.navigate(['afterlogin', 'spec', unit]).then(
        () => console.log('Navigation successful'),
        (error) => console.error('Navigation failed:', error)
      );
    } else {
      console.error('Invalid unit value:', unit);
    }
  }

  proceed1(unit: string) {
    console.log("Clicked on unit:", unit);
  
    if (unit) {
      this.router.navigate(['afterlogin', 'pit', unit]).then(
        () => console.log('Navigation successful'),
        (error) => console.error('Navigation failed:', error)
      );
    } else {
      console.error('Invalid unit value:', unit);
    }
  }
  proceed2(unit: string) {
    console.log("Clicked on unit:", unit);
  
    if (unit) {
      this.router.navigate(['afterlogin', 'cabin', unit]).then(
        () => console.log('Navigation successful'),
        (error) => console.error('Navigation failed:', error)
      );
    } else {
      console.error('Invalid unit value:', unit);
    }
  }
  proceed3(unit: string) {
    console.log("Clicked on unit:", unit);
  
    if (unit) {
      this.router.navigate(['afterlogin', 'cartop', unit]).then(
        () => console.log('Navigation successful'),
        (error) => console.error('Navigation failed:', error)
      );
    } else {
      console.error('Invalid unit value:', unit);
    }
  }
  proceed4(unit: string) {
    console.log("Clicked on unit:", unit);
  
    if (unit) {
      this.router.navigate(['afterlogin', 'machineroom', unit]).then(
        () => console.log('Navigation successful'),
        (error) => console.error('Navigation failed:', error)
      );
    } else {
      console.error('Invalid unit value:', unit);
    }
  }

  proceed5(unit: string) {
    console.log("Clicked on unit:", unit);
  
    if (unit) {
      this.router.navigate(['afterlogin', 'floorlanding', unit]).then(
        () => console.log('Navigation successful'),
        (error) => console.error('Navigation failed:', error)
      );
    } else {
      console.error('Invalid unit value:', unit);
    }
  }

}


