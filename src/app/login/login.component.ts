import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../apicall.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;
  recaptchaResponse!: string;
  protected aFormGroup!: FormGroup;
  isEmptyEmail = true;
  mail_not_verified=false;

  sitekey: string = '6LelQesoAAAAAC7muw12s8KTsGwD3mOvdQRjrY8S';

  constructor(
    private formBuilder: FormBuilder,
    private authService: ApicallService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    // Check if cookies are set, and if yes, populate the username and password fields
    const rememberedUsername = this.cookieService.get('rememberedUsername');
    const rememberedPassword = this.cookieService.get('rememberedPassword');

    if (rememberedUsername && rememberedPassword) {
      this.username = rememberedUsername;
      this.password = rememberedPassword;
      this.rememberMe = true; // Optionally, you can set the checkbox to checked
      console.log('Retrieved cookies:', rememberedUsername, rememberedPassword);
    }
  }

  onSubmit() {
    if (this.username !== '' && this.password !== '') {
      // Your existing login logic

      // Check if "Remember Me" is checked
      if (this.rememberMe) {
        console.log('Cookies worked');
        // Set cookies for username and password
        this.cookieService.set('rememberedUsername', this.username);
        this.cookieService.set('rememberedPassword', this.password);
      }

      this.authService.login(this.username, this.password).subscribe(
        (response: any) => {


          if(response){
          const token = response.token;
          const status = response.status;
          const role1 = response.role.replace('\r', '').replace('\n', '')
          const organization = response.organization;
          const userName = response.user_name;
          const mail_status=response.mail_status;
          // Store the token and user information in session storage
          sessionStorage.setItem('Role', role1);
          sessionStorage.setItem('Organization', organization);
          sessionStorage.setItem('UserName', userName);
          
          console.log("???????????",response)
          console.log("________",role1)
          
          // Redirect to another page or perform desired actions
          if (status === 1) {
            if(mail_status==1){
              sessionStorage.setItem('Email', this.username);
            console.log(role1, organization, userName);
            this.router.navigate(['/afterlogin', { role: role1 }]);
            }
            else{
              this.mail_not_verified=true;
              alert('Mail Not Verified.');
            }
          }
           else {
            alert('You do not have a valid subscription.');
          }
        }
        },
        (error: any) => {
          console.error(error);
          if (error.status === 401) {
            // Unauthorized: Invalid username or password
            // Display an error message to the user
            alert('Unauthorized user');
          } else {
            // Handle other types of errors (e.g., server errors)
            alert('An error occurred');
          }
          // Handle login error
        }
      );
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Handle reCAPTCHA response
  onCaptchaResolved(response: any): void {
    console.log('recaptcha worked');
    console.log('reCAPTCHA resolved:', this.recaptchaResponse);
    // Store reCAPTCHA response in a variable
    this.recaptchaResponse = response;
  }

  Resend_Mail_verificarion(){
    console.log("REsend");

    if(this.username !=''){
      this.authService.Resend_mail_verification(this.username).subscribe((response: any) => {
        console.log("response", response);
      
        if (response.success) {
          // Show success alert
          alert('Verification link sent successfully');
          this.mail_not_verified=false;
        } else {
          // Show error alert
          alert('Failed to send verification link');
        }
      });
    
    
    }
    
  }
}
