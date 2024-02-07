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

  selectedFile: File | null = null;

  
constructor(private apicall:ApicallService,private http: HttpClient){
console.log("&&&&&&&&&&&&&&&",sessionStorage.getItem("UserName"));


}

onFileChange(event: any): void {
  this.selectedFile = event.target.files[0];
}
uploadFile(): void {
  console.log("function called")
  if (!this.selectedFile) {
    alert('No file selected');
    return;
  }

  const formData = new FormData();
  formData.append('file', this.selectedFile);

  this.http.post('http://localhost:3000/upload', formData)
    .subscribe(
      (response: any) => {
        alert(response.message );
      },
      (error) => {
        console.error('Error uploading file:', error);
        alert(error);
      }
    );
}

// dataArray: any[] = [
//     { name: '', years: [{year: '', months: [ {   month: '',   dates: [],  },  ],},], },  ];

dataArray: any[] = [];
  services = [
    {
      name: 'Lift_Inspections',
      description: 'Comprehensive inspections for elevators to ensure safety and compliance.',
      imageUrl: 'assets/lift.png',
    },
    {
      name: 'Car_Parking_Systems',
      description: 'Inspecting car parking systems to keep them reliable and efficient.',
      imageUrl: 'assets/carparking.png',
    },
    {
      name: 'Escalator_Inspections',
      description:'Ensuring safe and smooth escalator operation through inspections',
      imageUrl: 'assets/escalator1.png',
    },
    // Add more inspection service objects
  ];

  viewDetails() {
   
  }
}