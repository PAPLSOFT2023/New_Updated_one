import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallService } from 'src/app/apicall.service';

@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.scss']
})
export class NewReportComponent {
  incompleteReports: any[] = [];
  constructor(private apicallservice:ApicallService, private router:Router)
  {

    // console.log("constructor called");
    
    this.apicallservice.getUnit_details().subscribe(
      (responses: any[]) => {
        console.log("Responses:", responses);

        responses.forEach((response) => {
         
          if (response && !response.ReportComplete) {
            try {
             
              const unitNos = JSON.parse(response.unit_no);
              
              
              const modifiedResponse = {
                ...response,
                parsedUnitNos: unitNos 
              };

             
              this.incompleteReports.push(modifiedResponse);

            } catch (error) {
              console.error("Error parsing unit_no:", error);
            }
          }
        });

       
        console.log("Incomplete Reports with Parsed unit_no:", this.incompleteReports);
      },
      (error: any) => {
        console.error('Error fetching unit details:', error);
      }
    );
  }

  replaceHyphenWithSlash(contractNumber: string): string {
    return contractNumber.replace('-', '/');
  }

  navigateToReportDetail(contractNumber: string, documentid_For_Url: string, event: MouseEvent) {
    this.apicallservice.checkContract_Avai_INF(contractNumber).subscribe((result:any)=>{

      if(result.length>0 && result){
        this.router.navigate(['ReportElevator1',contractNumber,documentid_For_Url])

      }
      else{
        alert(contractNumber.replace('-','/')+" Contract Number is not Available in INF Database")
      }

    },(error:any)=>{} );
    
  }
}