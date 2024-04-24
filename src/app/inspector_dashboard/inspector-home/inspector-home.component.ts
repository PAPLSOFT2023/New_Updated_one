import { Component, OnInit } from '@angular/core';
import { ApicallService } from 'src/app/apicall.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';
import { DatePipe } from '@angular/common';

// import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
// import { DatePipe } from '@angular/common';

import { response } from 'express';
import * as fs from 'fs';

import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-inspector-home',
  templateUrl: './inspector-home.component.html',
  styleUrls: ['./inspector-home.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(500)), // Adjust the duration as needed
    ])
  ]
})
export class InspectorHomeComponent implements OnInit {
[x: string]: any;
  name: string = '';
  recordCount: number = 0;
  records:any[]=[];
  scheduleBool:boolean=false;
  showSendMailPopup = false; // Track the state of the popup
  // Your other variables and methods
 
  Error: string = "";
  open_popUp=false;
  isGetInfDataEnabled = false;
  isGetInspectorDataEnabled = false;
  isGetMailSetupEnabled = false;
  isSendingMailEnabled = false;
  isMailReportEnabled = false;
  // request : any ;
 

  // location:string='/assets/logo1.png'

  constructor(private datePipe:DatePipe,private apicallservice: ApicallService, private http: HttpClient,private router:Router,private route: ActivatedRoute) {}

  ngOnInit() {
    

   
    this.scheduleBool=false
    this.name = sessionStorage.getItem('UserName') as string;
    console.log('------', this.name);
    this.getRecordCount(this.name);
    this.getRecordCount1(this.name);
    
    
    
  }




  redirectSchedule(){
    this.scheduleBool=true;
    this.router.navigate(['../schedule_page'], { relativeTo: this.route });
    
   
  }
  
  

 

 


  getRecordCount(name: string) {
    const params = new HttpParams().set('name', name);

    this.http.get<number>('http://localhost:3000/api/countRecords', { params })
      .subscribe(
        count => {
          this.recordCount = count;
        },
        error => {
          console.error('Error fetching record count:', error);
        }
      );
  }
  closeDialog(){
    this.open_popUp=!this.open_popUp;
  }

  Send_Mail_Client(id:string){
    this.open_popUp=!this.open_popUp;
    console.log("id,",id);
    // const sender=sessionStorage.getItem("Email") as string

    
    if(id!=null){
      this.apicallservice.getinfdata_forMail(id).subscribe(
        (response: any) => {
        if (response && response.length !== 0) {

         this. isGetInfDataEnabled = true;
  

         
          console.log("INF====>",response,"\n")
         this.apicallservice.getInspectorData(response[0].inspector_list).subscribe((inspector_data:any)=>{
          if(inspector_data)
          {


          
               this.isGetInspectorDataEnabled = true;
  
            console.log("Inspector Data====>",inspector_data,"\n")
            const inspvalue = inspector_data.map((jsonObject: Record<string, any>) =>
            Object.entries(jsonObject).flat()
          );

          const getEmailFromData = (dataArray: any[]): string | undefined => {
            const emailIndex = dataArray.indexOf('email_id');
            if (emailIndex !== -1 && emailIndex < dataArray.length - 1) {
              return dataArray[emailIndex + 1];
            }
            return undefined;
          };
          
          const emailArray: string[] = [];
          
          for (const personData of inspvalue) {
            // Check if personData is an array before processing
            if (Array.isArray(personData)) {
              const email = getEmailFromData(personData);
              if (email) {
                emailArray.push(email);
              }
            }
          }
          
         

            this.apicallservice.getMail_Setup("papl").subscribe((sender_Details:any)=>{
              if(sender_Details)
              {
                
                console.log("sender Data====>",sender_Details,"\n")

               
               this.isGetMailSetupEnabled = true;

  
                    const inspector_Data = inspector_data.map((jsonObject: Record<string, any>) =>
                    Object.entries(jsonObject).flat()
                  );

                    console.log("88", inspector_Data);

                    this.isSendingMailEnabled=true;
            
                    this.apicallservice.send_mail_to_client(
                      response[0].id,
                      response[0].master_customer_name,
                      response[0].total_units_schedule,
                      response[0].project_name,
                      response[0].location,
                      response[0].contract_number,
                      response[0].customer_workorder_name+","+response[0].customer_workorder_date,
                      response[0].schedule_from,
                      response[0].schedule_to,
                      response[0].no_of_mandays_as_per_work_order,
                      // differenceInDays,
                      response[0].type_of_inspection,
                      response[0].inspection_time_ins,
                      response[0].customer_contact_mailid,
                      emailArray,
                      inspector_Data,
                      sender_Details[0].App_password,
                      sender_Details[0].Email,
                      response[0].inspector_list
                      ).subscribe((mailStatus: any) => {
                        if (mailStatus && mailStatus.success) {
                          console.log("Email sent successfully:", mailStatus.success,response[0].id);
                          this.isMailReportEnabled = true;

                          this.apicallservice.set_send_Mail_status(response[0].id).subscribe(
                            (response) => {
                              setTimeout(() => {
                                this.open_popUp=!this.open_popUp;
                              }, 1500);
                            },
                            (error) => {
                              setTimeout(() => {
                                this.open_popUp=!this.open_popUp;
                              }, 1500);
                            }
                          );
                          

                          

                          
                          
                        }
                         else {
                          console.log("Failed to send email:", mailStatus.error);
                          // Handle the failure case as needed
                          this.Error="Failed to send mail";
                          setTimeout(() => {
                            this.open_popUp=!this.open_popUp;
                          }, 2000);
                        }
                      },
                      (error: any) => {
                        console.error("The email was not sent correctly.");
                        // Handle the error case as needed
                        this.Error="The email was not sent correctly.";
                        setTimeout(() => {
                          this.open_popUp=!this.open_popUp;
                        }, 2000);
                      }
                    );
                  }
            },(error:any)=>{
              this.Error="Mail setup Error";
              setTimeout(() => {
                this.open_popUp=!this.open_popUp;
              }, 2000);

            })
          }

         },(error:any)=>{
          this.Error="Did not get Inspector Data.";
          setTimeout(() => {
            this.open_popUp=!this.open_popUp;
          }, 2000);

         })
        }
        else{
          this.Error="Did not get INF Data."
          setTimeout(() => {
            this.open_popUp=!this.open_popUp;
          }, 2000);
        }

       },
       (error:any)=>{
       this.Error="Did not get Inspector Data."
       setTimeout(() => {
        this.open_popUp=!this.open_popUp;
      }, 2000);

       }
      );
    }
    else{
      alert("Did not get Project ID.")
    }

  }

  public isSendMailEnabled(inspectorArrayString: string): boolean {
    try {
      const inspectorArray: any[] = JSON.parse(inspectorArrayString);
      
      console.log('Parsed inspectorArray:', inspectorArray);
      
      if (Array.isArray(inspectorArray) && inspectorArray.length > 0) {
        const result = inspectorArray.every((inspector: any) => inspector.i_approved === 1);
        console.log('All i_approved values are 1:', result);
        
        // Check for name and headChecked condition
        const nameMatchesAndHeadChecked = inspectorArray.some((inspector: any) => {
          return inspector.name === this.name && inspector.headChecked === true;
        });
  
        console.log('Name matches and headChecked is true:', nameMatchesAndHeadChecked);
        
        return result && nameMatchesAndHeadChecked;
      } else {
        console.log('Array is not valid or empty');
        return false; // If inspectorArray is not an array or empty, disable the button
      }
    } catch (error) {
      console.error('Error processing inspectorArray:', error);
      return false; // Return false in case of any errors
    }
  }

  public saveSendMailEnabledStatus(inspectorArrayString: string): void {
    const sendMailEnabled = this.isSendMailEnabled(inspectorArrayString);
    sessionStorage.setItem('sendMailEnabled', sendMailEnabled ? 'true' : 'false');
  }







  getRecordCount1(name: string) {
    const params = new HttpParams().set('name', name);

    this.http.get<any>('http://localhost:3000/api/countRecords2', { params })
      .subscribe(
        count => {
            this.records = count;
            console.log(" ",count)
        },
        error => {
          console.error('Error fetching record count:', error);
        }
      );
  }

  pdf(no:string){
    
    // const successMessage = 'Click ok to view the document';
    // const userConfirmation = window.confirm(successMessage);
    // if(userConfirmation){
    //   console.log("Called..*******",no)
      this.router.navigate(['pdf',no]);
    // }
    // this.router.navigate(['pdf',no]);


  }

 
}
