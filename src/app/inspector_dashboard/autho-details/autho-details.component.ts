import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { DataService } from 'src/app/data.service';
import { ApicallService } from 'src/app/apicall.service';
interface Row {
  name: string;
  designation: string;
  company: string;
  contact_number: string;
}
@Component({
  selector: 'app-autho-details',
  templateUrl: './autho-details.component.html',
  styleUrls: ['./autho-details.component.scss']
})

export class AuthoDetailsComponent {
  val:string | null='';
  constructor(private route: ActivatedRoute,private dataService: ApicallService,private http :HttpClient,private router:Router){
     this.route.paramMap.subscribe(params => {
      this.val = params.get('c_no');
      console.log(this.val);
      
    });

  }
  // rows: Row[] = [{ name: '', designation: '', company: '', contact_number: '' }];
  rows: Row[] = [
    { name: '', designation: '', company: '', contact_number: '' },
    { name: '', designation: '', company: '', contact_number: '' },
    { name: '', designation: '', company: '', contact_number: '' },
    { name: '', designation: '', company: '', contact_number: '' }
  ];

  addRow() {
    this.rows.push({ name: '', designation: '', company: '', contact_number: '' });
  }

  show(){
    const store_values={
      witness_details:this.rows,
      document_id:this.val
      


    }
    // console.log(this.rows);
    this.http.put('http://localhost:3000/api/update_data_w', store_values).subscribe(
      (response) => {
        this.router.navigate(['afterlogin', 'unit',this.val]);

        
      },
      (error) => {
        console.error('Error storing data', error);
      }
    );

  }
}
