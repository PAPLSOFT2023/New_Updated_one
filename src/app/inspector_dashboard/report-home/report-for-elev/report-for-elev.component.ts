import { Component } from '@angular/core';
import { ApicallService } from '../../../apicall.service';



interface ElevatorPerformance {
  elevatorNo: string;
  maintenancePercentage: number;
  adjustmentPercentage: number;
  ratingPercentage: string;
}

interface Person {
  siNo: string;
  names: string;
  companyName: string;
  designation: string;
}



@Component({
  selector: 'app-report-for-elev',
  templateUrl: './report-for-elev.component.html',
  styleUrls: ['./report-for-elev.component.scss']
})
export class ReportForElevComponent {


  projectName:string="projectname";
  buildingNO:string="Building Number";
  place:string="Place";
  contractNo:string="Contract number";
  reportNo:string="Report number";
  dateOfInspection:string="Date of inspection";
  inspectorNameandCode:string="Inspector Name Code";
  
  // approved Details
  approved_product="Product"
  inspectedBy:string="Inspected_By_Name";
  approvedBy:string="Approved_by_Name";
  approvedPlace:string="PlaceValue";
  approvedDate:string="DateValue";


  // page side header data
  OEM="oem_value"
  
  headervalue:string=this.contractNo.replace(/-/g, "/")+"/"+this.OEM+"/"+this.projectName+"/"+this.place+"/2024/REV 01"

// page EXECUTIVE SUMMARY

nos_Product="COUNT0";






  people: Person[] = [
    {
      siNo: '1',
      names: 'Mr. Shreedhar.Naroskar.',
      companyName: 'CBRE',
      designation: 'Project Manager.'
    }
  ];


  performanceData: ElevatorPerformance[] = [
    { elevatorNo: 'P1', maintenancePercentage: 93, adjustmentPercentage: 90, ratingPercentage: '91.5%' },
    { elevatorNo: 'P2', maintenancePercentage: 93, adjustmentPercentage: 93, ratingPercentage: '91%' },
    // Add more data points as needed
    { elevatorNo: 'P3', maintenancePercentage: 94, adjustmentPercentage: 92, ratingPercentage: '93%' },
    { elevatorNo: 'P4', maintenancePercentage: 93, adjustmentPercentage: 89, ratingPercentage: '91%' },
    { elevatorNo: 'P1', maintenancePercentage: 93, adjustmentPercentage: 90, ratingPercentage: '91.5%' },
    { elevatorNo: 'P2', maintenancePercentage: 93, adjustmentPercentage: 93, ratingPercentage: '91%' },
    // Add more data points as needed
    { elevatorNo: 'P3', maintenancePercentage: 94, adjustmentPercentage: 92, ratingPercentage: '93%' },
    { elevatorNo: 'P4', maintenancePercentage: 93, adjustmentPercentage: 89, ratingPercentage: '91%' },
    { elevatorNo: 'P1', maintenancePercentage: 93, adjustmentPercentage: 90, ratingPercentage: '91.5%' },
    { elevatorNo: 'P2', maintenancePercentage: 93, adjustmentPercentage: 93, ratingPercentage: '91%' },
    // Add more data points as needed
    { elevatorNo: 'P3', maintenancePercentage: 94, adjustmentPercentage: 92, ratingPercentage: '93%' },
    { elevatorNo: 'P4', maintenancePercentage: 93, adjustmentPercentage: 89, ratingPercentage: '91%' },
    { elevatorNo: 'P1', maintenancePercentage: 93, adjustmentPercentage: 90, ratingPercentage: '91.5%' },
    { elevatorNo: 'P2', maintenancePercentage: 93, adjustmentPercentage: 93, ratingPercentage: '91%' },
    // Add more data points as needed
    { elevatorNo: 'P3', maintenancePercentage: 94, adjustmentPercentage: 92, ratingPercentage: '93%' },
    { elevatorNo: 'P4', maintenancePercentage: 93, adjustmentPercentage: 89, ratingPercentage: '91%' }, { elevatorNo: 'P1', maintenancePercentage: 93, adjustmentPercentage: 90, ratingPercentage: '91.5%' },
    { elevatorNo: 'P2', maintenancePercentage: 93, adjustmentPercentage: 93, ratingPercentage: '91%' },
    // Add more data points as needed
    { elevatorNo: 'P3', maintenancePercentage: 94, adjustmentPercentage: 92, ratingPercentage: '93%' },
    { elevatorNo: 'P4', maintenancePercentage: 93, adjustmentPercentage: 89, ratingPercentage: '91%' }, { elevatorNo: 'P1', maintenancePercentage: 93, adjustmentPercentage: 90, ratingPercentage: '91.5%' },
    { elevatorNo: 'P2', maintenancePercentage: 93, adjustmentPercentage: 93, ratingPercentage: '91%' },
    // Add more data points as needed
    { elevatorNo: 'P3', maintenancePercentage: 94, adjustmentPercentage: 92, ratingPercentage: '93%' },
    { elevatorNo: 'P4', maintenancePercentage: 93, adjustmentPercentage: 89, ratingPercentage: '91%' }, { elevatorNo: 'P1', maintenancePercentage: 93, adjustmentPercentage: 90, ratingPercentage: '91.5%' },
    { elevatorNo: 'P2', maintenancePercentage: 93, adjustmentPercentage: 93, ratingPercentage: '91%' },
    // Add more data points as needed
    { elevatorNo: 'P3', maintenancePercentage: 94, adjustmentPercentage: 92, ratingPercentage: '93%' },
    { elevatorNo: 'P4', maintenancePercentage: 93, adjustmentPercentage: 89, ratingPercentage: '91%' },
    // Continue adding all elevator data...
  ];

  remark = 'All snags should be attended and completed to improve the ratings and performance of the elevators.';

  constructor(private apicallservice:ApicallService){
    // this.getData()
  }

}