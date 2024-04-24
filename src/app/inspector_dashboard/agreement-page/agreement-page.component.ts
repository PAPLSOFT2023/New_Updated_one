import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { DataService } from 'src/app/data.service';
import { ApicallService } from 'src/app/apicall.service';

@Component({
  selector: 'app-agreement-page',
  templateUrl: './agreement-page.component.html',
  styleUrls: ['./agreement-page.component.scss']
})
export class AgreementPageComponent {
  name:string='';
  check:boolean=true;
  val:string | null='';
  units:string[] | any=[];
  salesProcess:string='no';
  selfAssigned:string='no';
  // inf_26:string[]|any=[];
  inspectorArray: string[] = [];
  matchedInspector:boolean|any='';
 
  inf_26:{id:number,contract_number:string,customer_workorder_name:string,customer_workorder_date:string,
    customer_name_as_per_work_order:string,type_of_inspection:string,job_type:string,project_name:string,
    building_name:string,location:string,type_of_building:string,site_address:string,customer_contact_name:string,
    ustomer_contact_number:string,customer_contact_number:string,customer_contact_mailid:string,oem_details:string,
    no_of_elevator:number,no_of_escalator:number,no_of_travelator:number,	no_of_mw:number, no_of_car_parking:number,
    travel_expenses_by:string,accomodation_by:string,no_of_stops_elevator:number,no_of_stops_dw:number,no_of_home_elevator:number,
    no_of_visits_as_per_work_order:number,no_of_mandays_as_per_work_order:number,	total_units_schedule:number,schedule_from:string,
    schedule_to:string,tpt6:number,	tpt7:number, load_test:number,pmt:number,rope_condition:number,callback:number,balance:number,inspector_list:string[],
    inspector_array:string}={id:0,contract_number:'',customer_workorder_name:'',customer_workorder_date:'',customer_name_as_per_work_order:'',type_of_inspection:'',job_type:'',project_name:'',building_name:'',location:'',type_of_building:'',site_address:'',customer_contact_name:'',ustomer_contact_number:'',customer_contact_number:'',customer_contact_mailid:'',oem_details:'',no_of_elevator:0,no_of_escalator:0,no_of_travelator:0,	no_of_mw:0,no_of_car_parking:0,travel_expenses_by:'',accomodation_by:'',no_of_stops_elevator:0,no_of_stops_dw:0,no_of_home_elevator:0,no_of_visits_as_per_work_order:0,no_of_mandays_as_per_work_order:0,	total_units_schedule:0,schedule_from:'',
    schedule_to:'',tpt6:0,	tpt7:0, load_test:0,pmt:0, rope_condition:0,callback:0,balance:0,inspector_list:[],inspector_array:''};

  constructor(private route: ActivatedRoute,private dataService: ApicallService,private http :HttpClient,private router:Router){
     this.route.paramMap.subscribe(params => {
      this.val = params.get('c_no');
      console.log(this.val);
      if (this.val) {
        sessionStorage.setItem('contract_no', this.val); 
      }
      
    });

  }
  ngOnInit(){
    this.name = sessionStorage.getItem('UserName') as string;
    //api call
    this.dataService.getDetailsForContractName(this.val).subscribe((details: any) => {
      console.log('inf api is called');
      
       this.inf_26 = details;
      //  console.log("*****",details.id)
      // this.selectedDetails=details;
      console.log('agreement page inf',this.inf_26);
      console.log('inspector array is',details.inspector_array);
      const Ins_array = JSON.parse(details.inspector_array);
      // console.log('parsed array',Ins_array);
      
      // const matchedInspector = Ins_array.find((inspector: any) => {
      //   return inspector.name === this.name && inspector.headChecked === true;
      // });
      // console.log('navigate logic',this.matchedInspector);
      // if (matchedInspector) {
      //   // Navigate to one URL if the condition is met
      //   this.router.navigate(['afterlogin', 'auth',450]);
      // } else {
      //   // Navigate to another URL if the condition is not met
      //   this.router.navigate(['afterlogin', 'risk',450]);
      // }
      // console.log('matches',matchedInspector);
      
      
      

     



      
    });
    
  }
  public isSendMailEnabled(inspectorArrayString: string): boolean {
    try {
      const inspectorArray: any[] = JSON.parse(inspectorArrayString);
            // const inspectorArray: any[] =inspectorArrayString;

      
      console.log('Parsed inspectorArray:', typeof(inspectorArray));
      
      if (Array.isArray(inspectorArray) && inspectorArray.length>0) {
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


  accept(){
    console.log('inspector name is',this.name);
    console.log('contract no is',this.val);
    console.log('agreement checked',this.check);
    console.log('inspector array from accept',this.inf_26.inspector_array);
    // const inspectorArray1:string[]| any[] = JSON.parse(this.inf_26.inspector_array);

    
    
    const store_values ={
      name:this.name,
      contract_no:this.val,
      check:this.check,
      selfAssigned:this.selfAssigned,
      salesProcess:this.salesProcess,

    }
    this.http.post('http://localhost:3000/api/store_data_agreement', store_values).subscribe(
      (response) => {
        console.log('Data stored successfully', response);
   
    // this.router.navigate(['afterlogin', 'auth',response]);
    console.log('ans for matching records',this.matchedInspector);
    // const matchedInspector = this.isSendMailEnabled(this.inf_26.inspector_array);


    console.log("^^",typeof(this.inf_26.inspector_array))
    const matchedInspector = this.isSendMailEnabled((this.inf_26.inspector_array));
    // const matchedInspector = this.isSendMailEnabled(this.inf_26.inspector_array);

    console.log('mached inspector', matchedInspector);
    

     if (matchedInspector) {
        // Navigate to one URL if the condition is met
        this.router.navigate(['afterlogin', 'auth',response]);
      } else {
        // Navigate to another URL if the condition is not met
        this.router.navigate(['afterlogin', 'risk',response]);
      }
    
    

  
  
  },
      (error) => {
        console.error('Error storing data', error);
      }
    );
    

    
  }
  

}
