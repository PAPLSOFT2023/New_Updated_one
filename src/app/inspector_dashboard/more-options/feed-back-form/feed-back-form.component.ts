import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';
// import { DataService } from 'src/app/data.service';
import { ApicallService } from 'src/app/apicall.service';

@Component({
  selector: 'app-feed-back-form',
  templateUrl: './feed-back-form.component.html',
  styleUrls: ['./feed-back-form.component.scss']
})
export class FeedBackFormComponent {
  val:string |null='';
  name: string='';
  designation: string='';
  contactNo: string='';
  emailId: string='';
  option1:string='';
  option2:string='';
  option3:string='';
  option4:string='';
  option5:string='';
  ratings: number[][] = [
    [0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0]  
  ];

  lastClickedIndex: number[] = [-1, -1, -1, -1, -1];
  constructor(private route: ActivatedRoute,private dataService: ApicallService,private http :HttpClient,private router:Router){
    this.route.paramMap.subscribe(params => {
     this.val = params.get('c_no');
     console.log(this.val);
     if(this.val){
       // sessionStorage.setItem('document_id', this.val); 
     }
     
   });

 }

  rate(questionIndex: number, starIndex: number) {
    this.ratings[questionIndex] = this.ratings[questionIndex].map((value, index) => index <= starIndex ? 1 : 0);
    this.lastClickedIndex[questionIndex] = starIndex;
  }

  getLastCheckedText(questionIndex: number): string {
    const lastClicked = this.lastClickedIndex[questionIndex];
    const textMap = ["Poor", "Average", "Good", "Very Good", "Excellent"];
    return lastClicked !== -1 ? textMap[lastClicked] : ''; 
  }

  isInputEnabled(questionIndex: number): boolean {
    const sumOfRatings = this.ratings[questionIndex].reduce((acc, rating) => acc + rating, 0);
    return sumOfRatings < 5;
}
check(){
  console.log('ans is',this.ratings);
  const inputData = {
    name: this.name,
    designation: this.designation,
    contactNo: this.contactNo,
    emailId: this.emailId
  };
  const Options={
    option1:this.option1,
    option2:this.option2,
    option3:this.option3,
    option4:this.option4,
    option5:this.option5
  }
  console.log('Input Data:', inputData);
  console.log('options:', Options);
  const store_values ={
    rating:this.ratings,
    customer_details:inputData,
    options:Options,
    document_id:this.val
  }

  this.http.put('http://localhost:3000/api/update_data_feedback', store_values).subscribe(
    (response) => {
      // this.router.navigate(['afterlogin', 'risk',this.val]);
      // alert('thank you...!');
      if (confirm('Done..!')) {
        // Redirect to another page
        this.router.navigate(['afterlogin', 'more_options']);
      }

      
    },
    (error) => {
      console.error('Error storing data', error);
    }
  );
  
  
}


}