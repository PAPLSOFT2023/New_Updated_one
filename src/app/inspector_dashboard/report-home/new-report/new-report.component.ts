import { Component } from '@angular/core';
import { ApicallService } from 'src/app/apicall.service';

@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.scss']
})
export class NewReportComponent {
  incompleteReports: any[] = [];
  constructor(private apicallservice:ApicallService)
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


}