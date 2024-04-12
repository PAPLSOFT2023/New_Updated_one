import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { DataService } from 'src/app/data.service';
import { ApicallService } from 'src/app/apicall.service';

@Component({
  selector: 'app-agreement-page',
  templateUrl: './agreement-page.component.html',
  styleUrls: ['./agreement-page.component.scss']
})
export class AgreementPageComponent {
  name:string='';
  check:boolean=true;
  val:string | null='';
  units:string[] | any=[];
  salesProcess:string='no';
  selfAssigned:string='no';
  constructor(private route: ActivatedRoute,private dataService: ApicallService,private http :HttpClient,private router:Router){
     this.route.paramMap.subscribe(params => {
      this.val = params.get('c_no');
      console.log(this.val);
      if (this.val) {
        sessionStorage.setItem('contract_no', this.val); 
      }
      
    });

  }
  ngOnInit(){
    this.name = sessionStorage.getItem('UserName') as string;
    
  }

  accept(){
    console.log('inspector name is',this.name);
    console.log('contract no is',this.val);
    console.log('agreement checked',this.check);
    const store_values ={
      name:this.name,
      contract_no:this.val,
      check:this.check,
      selfAssigned:this.selfAssigned,
      salesProcess:this.salesProcess
    }
    this.http.post('http://localhost:3000/api/store_data_agreement', store_values).subscribe(
      (response) => {
        console.log('Data stored successfully', response);
    //     const successMessage = 'Success...!';
    // const userConfirmation = window.confirm(successMessage);

    // if(userConfirmation){
    //   this.router.navigate(['/afterlogin/sales_home']);

    // }
    this.router.navigate(['afterlogin', 'auth',response]);
  },
      (error) => {
        console.error('Error storing data', error);
      }
    );
    

    
  }
  

}
