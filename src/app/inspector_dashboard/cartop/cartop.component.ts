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
  val :string | null='';
  name:string | null ='';
  document_id:string | null ='';
  unit_no:string|null='';


  steps: string[] = [];
  completedStatus: boolean[] =[];



  constructor(private route: ActivatedRoute,private apicallService: ApicallService,private http :HttpClient,private router:Router){
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

    if (this.val !== null) {
      this.val="car top"
    this.apicallService.getpitContent(this.val).subscribe((response:any)=>{

      if(response)
      {

       
        this.steps = response.map((item: { Description: any; }) => item.Description);
        console.log("Respeonse",this.steps)
        this.apicallService.Check_check_data_exists(this.document_id,this.unit_no,this.val,this.name,this.steps).subscribe((responseArray:any)=>{
if(responseArray)
{
  this.completedStatus=responseArray
  // console.log("response",responseArray)
}
        })
      }
    }
    ,(error:any)=>{
    })   
  }
  else{
    alert("Session Expired, Please Login again")
  }
  }



  getLogoLetters(step: string): string {
    const words = step.split(' '); // Split step into words
    let logo = ''; // Initialize the logo string
    if (words.length > 0) {
      logo += words[0].charAt(0); // Add the first letter of the first word
    }
    if (words.length > 1) {
      logo += words[1].charAt(0); // Add the first letter of the second word
    }
    return logo;
  }

  handleCardClick(step: string) {
    const id = encodeURIComponent(step);
    this.router.navigate(['afterlogin', 'carcheckpoint',id,this.document_id,this.unit_no,this.name,this.val]);
  }
}
