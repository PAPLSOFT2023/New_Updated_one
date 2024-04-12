import { Component } from '@angular/core';
import { ApicallService } from 'src/app/apicall.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/INF/dialog/dialog.component';
import { RejectionComponent } from '../rejection/rejection.component';

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss']
})
export class SchedulePageComponent {
  name: string = '';
  records:any[]=[];
  scheduleBool:boolean=false;
  salesProcess:string='';
  selfAssigned:string='';
  isAcceptButtonDisabled: boolean = false;

    // Method to update the disabled state of the accept button
    updateAcceptButtonState() {
        // If both radio buttons are 'No', disable the accept button
        if (this.salesProcess === 'no' && this.selfAssigned === 'no') {
            this.isAcceptButtonDisabled = true;
        } else {
            this.isAcceptButtonDisabled = false;
        }
    }

  constructor(private apicallservice: ApicallService, private http: HttpClient,private router:Router, private dialog:MatDialog, private route: ActivatedRoute) {}

  ngOnInit() {
    this.scheduleBool=false
    this.name = sessionStorage.getItem('UserName') as string;
    console.log('------', this.name);
    this.getRecordCount(this.name);
    this.get_Insp_Name_List();
  }
  openRejectDialog(request: any){
    const dialogRef = this.dialog.open(RejectionComponent, {
      width: '300px',
      data: { request }, // Pass data to the dialog if needed
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        // Handle the rejected request with the reason selected (result)
        console.log('Rejected with reason:', result);
        this.router.navigate(['../inspectorHome'], { relativeTo: this.route });
        // Call your rejectRequest() function passing the reason or handle accordingly
      }
    });
  
 
    
    }




  redirectSchedule(){
    this.scheduleBool=true;
    this.router.navigate(['/afterlogin/inspectorHome/schedule_page']);
   
  }

  getRecordCount(name: string) {
    const params = new HttpParams().set('name', name);

    this.http.get<any>('http://localhost:3000/api/countRecords1', { params })
      .subscribe(
        count => {
            this.records = count;
        },
        error => {
          console.error('Error fetching record count:', error);
        }
      );
  }
  // approveRequest(id:number){
  //   const params = new HttpParams().set('id',id );
  //   console.log(id);
    

  //   this.http.put<any>('http://localhost:3000/api/approveRecords', { params })
  //     .subscribe(
  //       count => {
  //           // this.records = count;
  //           console.log('successful');
  //           alert("successful...!")
            
  //       },
  //       error => {
  //         console.error('Error fetching record count:', error);
  //       }
  //     );

  // }
  approveRequest(id: number) {
    const params = new HttpParams().set('id', id.toString()).set('name',this.name.toString());
    console.log(id);
  
    this.http.put<any>('http://localhost:3000/api/approveRecords', {}, { params }) // Include empty object as body
      .subscribe(
        count => {
          // this.records = count;
          console.log('successful');
          alert('Successful...!');
          this.router.navigate(['../inspectorHome'], { relativeTo: this.route });
        },
        error => {
          console.error('Error approving record:', error);
        }
      );
  }
  
  get_Insp_Name_List() {
    this.apicallservice.get_Insp_Name_List().subscribe(
      (response: any[]) => {
        if (response) {
          console.log('@@@', response);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
