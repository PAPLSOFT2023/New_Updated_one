import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { DataService } from 'src/app/data.service';
import { ApicallService } from 'src/app/apicall.service';
import { response } from 'express';


@Component({
  selector: 'app-pit',
  templateUrl: './pit.component.html',
  styleUrls: ['./pit.component.scss']
})
export class PitComponent {
  val:string | null='';
  name:string | null ='';
  document_id:string | null ='';
  unit_no:string|null='';


  steps: string[] = [];
  completedStatus: boolean[] = [true, true, false, false];



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

    this.apicallService.getpitContent("Pit").subscribe((response:any)=>{

      if(response)
      {

        this.steps = response.map((item: { Description: any; }) => item.Description);
      }
    }
    ,(error:any)=>{
    })   
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
    this.router.navigate(['afterlogin', 'pitcheckpoint',id,this.document_id,this.unit_no,this.name]);
  }
}
