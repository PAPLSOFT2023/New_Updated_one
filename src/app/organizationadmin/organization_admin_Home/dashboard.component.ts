import { Component } from '@angular/core';
import { ApicallService } from '../../apicall.service';
import { response } from 'express';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {

  userLoggedIn: boolean = false; // Variable to track user login status
  userEmail: string = 'user@example.com'; // User email

  constructor() { 

    const storedEmail = sessionStorage.getItem("UserName");
    if (storedEmail !== null) {
      this.userEmail = storedEmail;
    }
  }

  
}