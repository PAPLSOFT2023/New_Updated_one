import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallService } from '../apicall.service';
import { response } from 'express';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotpasswordComponent {
  email: string = '';

  constructor(private router: Router,private apicall:ApicallService) {
    // ... constructor code
  }

  onSubmit() {
    console.log(this.email)
    if(this.email){
    this.apicall.checkUserEmailExists(this.email).subscribe((response:any)=>{
      if(response)
      {
        console.log("&&&&&",response)
      }
      else{
        console.log("::::",response)
      }

    },(error:any)=>{

      console.log(error)
    });
  }else{
    alert("Please Enter Email")
  }



  }

   



    BackToLogin() {
      // Navigate back to the login page when the "Back to Login" button is clicked
      this.router.navigate(['/login']);
  }

}