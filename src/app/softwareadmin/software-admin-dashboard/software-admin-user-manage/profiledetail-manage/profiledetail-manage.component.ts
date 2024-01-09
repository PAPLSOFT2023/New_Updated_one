import { Component, OnInit, ViewChild } from '@angular/core';
import { ApicallService } from 'src/app/apicall.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';

@Component({
  selector: 'app-profiledetail-manage',
  templateUrl: './profiledetail-manage.component.html',
  styleUrls: ['./profiledetail-manage.component.scss']
})
export class ProfiledetailManageComponent implements OnInit {
  users: { NAME: string, email_id: string, PSN_NO: string, designation: string, contact_no: number, date_of_joining: Date, date_of_birth: Date, dept: string }[] = [];
  user: { NAME: string, email_id: string, PSN_NO: string, designation: string, contact_no: number, date_of_joining: Date, date_of_birth: Date, dept: string } = { NAME: '', email_id: '', PSN_NO: '', designation: '', contact_no: 0, date_of_joining: new Date(), date_of_birth: new Date(), dept: '' };


  NAME:string='';
  @ViewChild('userForm', { static: false }) userForm!: NgForm;
  
  existingemail: string= "";
  DOB: string = "-";
  Join: string = '-';
  isUserPopupOpen = false;
  isUserPopupOpen1 = false;
  showRequiredError: boolean = false;
  invalidAge = false;


  private apiUrl = 'http://localhost:3000/api/users';

  private isDatePickerOpen = {
    date_of_joining: false,
    date_of_birth: false
  };

  constructor(
    private apicallservice: ApicallService,
    private datePipe: DatePipe,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadDataFromDB();
  }

  private parseDate(dateString: string): Date {
    return new Date(dateString);
  }
  
  toggleUserPopup() {
    this.isUserPopupOpen = !this.isUserPopupOpen;

    // Reset the user form when opening the popup
    if (this.isUserPopupOpen) {
      this.resetUser();
    }
  }

  
  onSubmit() {
    console.log('name is',this.NAME);
    
  //   if (this.userForm.valid) {
  //     const userData = this.userForm.value;
  // console.log(  this.user.NAME,
  //   this.user.email_id,
  //   this.user.PSN_NO,
  //   this.user.designation,
  //   this.user.contact_no,
  //   this.user.date_of_joining,
  //   this.user.date_of_birth,
  //   this.user.dept,"++++")
  //     // Call the service method to add the user
  //     this.apicallservice.addProfileData(
  //       userData.NAME,
  //       userData.email_id,
  //       userData.PSN_NO,
  //       userData.designation,
  //       userData.contact_no,
  //       userData.date_of_joining,
  //       userData.date_of_birth,
  //       userData.dept
  //     ).subscribe(
  //       (response) => {
  //         console.log('User added successfully:', response);
  //         // Handle success (e.g., show a success message, reset the form)
  //         this.toggleUserPopup();
  //       },
  //       (error) => {
  //         console.error('Error adding user:', error);
  //         // Handle error (e.g., show an error message)
  //       }
  //     );
  //   } else {
  //     console.error("not working");
  //     // Form is invalid, show error messages or take appropriate action
  //   }
  }
  

  Update_data(){
    this.apicallservice.updateprofiledata(
      this.user.NAME,this.user.email_id,this.user.PSN_NO,this.user.designation,this.user.contact_no,this.user.date_of_joining,this.user.date_of_birth,this.user.dept,this.existingemail
      
    ).subscribe((response:any) => {
      console.log(response.message);
      const index = this.users.findIndex((user) => this.user.email_id === this.user.email_id);
      if (index !==-1){
        this.users[index] = {...this.user};
        this.resetUser();
        // this.editmode = false ;
        this.closeUserPopup();
      }
    
    },(error:any)=>{});
    
  }
  
  //delete crud :
 

deleteUser(email:string) {


  
  if (confirm('Are you sure you want to delete this user?')) {
    this.apicallservice.deleteProfileData(email).subscribe(
      (response: any) => {
        console.log(response.message);
        const index = this.users.findIndex((user) => user.email_id === this.user.email_id);
        if (index !== -1) {
          this.users.splice(index, 1); // Remove the deleted user from the array
          this.resetUser();
          this.closeUserPopup();
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}

  




  private editUserInternal(userId: string) {
    if (userId) {
      const existingUser = this.users.find(u => u.email_id === userId);
      if (existingUser) {
        this.user = { ...existingUser };
        this.isUserPopupOpen1 = true;
      }
    }
  }

  closeUserPopup() {
    this.isUserPopupOpen = false;
    this.isUserPopupOpen1 = false;
    this.resetUser();
  }
 

  closeUserPopup1() {
    this.isUserPopupOpen1 = false;
    this.resetUser();
  }

  editUser(userId: string) {
    if (userId) {
      const existingUser = this.users.find(u => u.email_id === userId);
      if (existingUser) {
        this.user = { ...existingUser };
        this.existingemail = this.user.email_id;
        this.DOB = this.user.date_of_birth ? this.datePipe.transform(this.user.date_of_birth, 'yyyy-MM-dd') || '' : '';
        this.Join = this.user.date_of_joining ? this.datePipe.transform(this.user.date_of_joining, 'yyyy-MM-dd') || '' : '';
        this.isUserPopupOpen1 = true;
      }
    }
  }

  resetUser() {
    this.user = { NAME: '', email_id: '', PSN_NO: '', designation: '', contact_no: 0, date_of_joining: new Date(), date_of_birth: new Date(), dept: '' };
  }

  

  loadDataFromDB() {
    this.apicallservice.get_emp_data().subscribe(
      (response: any) => {
        this.users = response.map((user: any) => ({
          ...user,
          date_of_joining: user.date_of_joining,
          date_of_birth: this.parseDate(user.date_of_birth)
        }));
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
