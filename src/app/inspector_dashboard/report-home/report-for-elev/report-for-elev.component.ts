import { Component } from '@angular/core';
import { ApicallService } from '../../../apicall.service';
import { ActivatedRoute } from '@angular/router';



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

interface RatingData {
  header: string;
  address: string;
}

@Component({
  selector: 'app-report-for-elev',
  templateUrl: './report-for-elev.component.html',
  styleUrls: ['./report-for-elev.component.scss']
})
export class ReportForElevComponent {
// for database access




// for pdf home




  projectName:string="";
  buildingNO:string="";
  place:string="";
  contractNo:string="";
  Rep_From:string=""
  Rep_to:string=""
  inspectorNameandCode: string | null = sessionStorage.getItem("UserName");
   charactersAfterSecondSlash: string="";
  
  // approved Details
  approved_product="Elevators"
  inspectedBy:string="Inspected_By_Name";
  approvedBy:string="H.Amanullah";
  approvedPlace:string="Chennai";
  approvedDate:string="";

  // witness data
   witnessDetailsArray: any[] = [];


  // page side header data
  OEM:string=""
  
  headervalue:string=""

// page EXECUTIVE SUMMARY

nos_Product="COUNT0";
BriefmultiDimArray_cunt:number=0;
 BriefmultiDimArray: {
   id: number, document_id: number, inspector_name: string,speed:string,capacity:string,unit_no:string,elevator_number:string, 	oem: string, year_of_manufacture: string,	machine_location:string,controller_driver_type:string,controller_name_as_per_oem:string,
  type_of_equipment:string,type_of_usage:string,type_of_operation:string,grouping_type:string,	name_of_the_group:string,floor_stops:string,floor_opening:string,floor_designation:string,front_opening_floors:string,	rear_opening_floors:string,
  service_floors:string,	emergency_stop_floors:string,rope_category:string,	number_of_rope_belt:string,	rope_size:string,no_of_drive_sheave_grooves:string,
  ropes_wrap_details:string,type_of_roping:string,	machine_type:string,	motor_kilo_watt:string,motor_voltage:string,motor_current_in_ampere:string,
  motor_frequency:string,motor_rpm:string,motor_insulation_class:string,motor_ingress_protection:string,	motor_no_of_poles:string,	motor_st_hr:string,
  motor_serial_number:string,	car_governor_rope_dia:string,car_governor_normal_speed:string,car_governor_electric_tripping_speed:string,car_governor_mechanical_tripping_speed:string,
  cwt_governor:any,cwt_governor_rope_dia:string,cwt_governor_normal_speed:string,cwt_governor_electrical_tripping_speed:string,cwt_governor_mechanical_tripping_speed:string,
  door_operator:string,entrance_height:string,entrance_width:string,entrance_type_of_opening:string,	cabin_height:string,cabin_width:string,no_of_cop:string,car_indicator_type:string,
  multimedia_display:string,	no_of_cabin_fans:string,type_of_cabin_fans:string,type_of_call_buttons:string,	car_stop_button:string,car_service_cabinet:string,
  car_voice_announcement:string,car_handrail:string,car_cabin_bumper:string,car_auto_attendant:string,car_auto_independent:string,	car_non_stop:string,car_fan_switch:string,
  hall_indicator_type:string,hall_lantems:string,hall_arrival_chime:string,	no_of_risers_at_main_lobby:string,no_of_risers_at_other_floors:string,
  hall_call_type_at_main_lobby:string,	hall_call_type_at_all_floors:string,	no_of_car_buffers:string,type_of_car_buffers:string,no_of_counter_weight_buffer:string,
  type_of_cwt_buffer:string,	e_light:any,e_alarm:any,e_intercom:any,	ard_operation:any,ard_audio:any,ard_visual:any,fireman_operation:any,
  fer:any,fireman_audio:any,fireman_visual:any,manual_rescue:any,passenger_overload_operation:any,passenger_overload_visual:any,passenger_overload_audio:any,
  seismic_sensor_operation:any
}[] = [];



BriefsingleVal:{id: number, document_id: number, inspector_name: string,speed:string,unit_no:string,capacity:string,elevator_number:string, 	oem: string, year_of_manufacture: string,	machine_location:string,controller_driver_type:string,controller_name_as_per_oem:string,
  type_of_equipment:string,type_of_usage:string,type_of_operation:string,grouping_type:string,	name_of_the_group:string,floor_stops:string,floor_opening:string,floor_designation:string,front_opening_floors:string,	rear_opening_floors:string,
  service_floors:string,	emergency_stop_floors:string,rope_category:string,	number_of_rope_belt:string,	rope_size:string,no_of_drive_sheave_grooves:string,
  ropes_wrap_details:string,type_of_roping:string,	machine_type:string,	motor_kilo_watt:string,motor_voltage:string,motor_current_in_ampere:string,
  motor_frequency:string,motor_rpm:string,motor_insulation_class:string,motor_ingress_protection:string,	motor_no_of_poles:string,	motor_st_hr:string,
  motor_serial_number:string,	car_governor_rope_dia:string,car_governor_normal_speed:string,car_governor_electric_tripping_speed:string,car_governor_mechanical_tripping_speed:string,
  cwt_governor:any,cwt_governor_rope_dia:string,cwt_governor_normal_speed:string,cwt_governor_electrical_tripping_speed:string,cwt_governor_mechanical_tripping_speed:string,
  door_operator:string,entrance_height:string,entrance_width:string,entrance_type_of_opening:string,	cabin_height:string,cabin_width:string,no_of_cop:string,car_indicator_type:string,
  multimedia_display:string,	no_of_cabin_fans:string,type_of_cabin_fans:string,type_of_call_buttons:string,	car_stop_button:string,car_service_cabinet:string,
  car_voice_announcement:string,car_handrail:string,car_cabin_bumper:string,car_auto_attendant:string,car_auto_independent:string,	car_non_stop:string,car_fan_switch:string,
  hall_indicator_type:string,hall_lantems:string,hall_arrival_chime:string,	no_of_risers_at_main_lobby:string,no_of_risers_at_other_floors:string,
  hall_call_type_at_main_lobby:string,	hall_call_type_at_all_floors:string,	no_of_car_buffers:string,type_of_car_buffers:string,no_of_counter_weight_buffer:string,
  type_of_cwt_buffer:string,	e_light:any,e_alarm:any,e_intercom:any,	ard_operation:any,ard_audio:any,ard_visual:any,fireman_operation:any,
  fer:any,fireman_audio:any,fireman_visual:any,manual_rescue:any,passenger_overload_operation:any,passenger_overload_visual:any,passenger_overload_audio:any,
  seismic_sensor_operation:any}={id: 0, document_id: 0, inspector_name: '',speed:'',unit_no:'',capacity:'',elevator_number:'', 	oem: '', year_of_manufacture: '',	machine_location:'',controller_driver_type:'',controller_name_as_per_oem:'',
    type_of_equipment:'',type_of_usage:'',type_of_operation:'',grouping_type:'',	name_of_the_group:'',floor_stops:'',floor_opening:'',floor_designation:'',front_opening_floors:'',	rear_opening_floors:'',
    service_floors:'',	emergency_stop_floors:'',rope_category:'',	number_of_rope_belt:'',	rope_size:'',no_of_drive_sheave_grooves:'',
    ropes_wrap_details:'',type_of_roping:'',	machine_type:'',	motor_kilo_watt:'',motor_voltage:'',motor_current_in_ampere:'',
    motor_frequency:'',motor_rpm:'',motor_insulation_class:'',motor_ingress_protection:'',	motor_no_of_poles:'',	motor_st_hr:'',
    motor_serial_number:'',	car_governor_rope_dia:'',car_governor_normal_speed:'',car_governor_electric_tripping_speed:'',car_governor_mechanical_tripping_speed:'',
    cwt_governor:null,cwt_governor_rope_dia:'',cwt_governor_normal_speed:'',cwt_governor_electrical_tripping_speed:'',cwt_governor_mechanical_tripping_speed:'',
    door_operator:'',entrance_height:'',entrance_width:'',entrance_type_of_opening:'',	cabin_height:'',cabin_width:'',no_of_cop:'',car_indicator_type:'',
    multimedia_display:'',	no_of_cabin_fans:'',type_of_cabin_fans:'',type_of_call_buttons:'',	car_stop_button:'',car_service_cabinet:'',
    car_voice_announcement:'',car_handrail:'',car_cabin_bumper:'',car_auto_attendant:'',car_auto_independent:'',	car_non_stop:'',car_fan_switch:'',
    hall_indicator_type:'',hall_lantems:'',hall_arrival_chime:'',	no_of_risers_at_main_lobby:'',no_of_risers_at_other_floors:'',
    hall_call_type_at_main_lobby:'',	hall_call_type_at_all_floors:'',	no_of_car_buffers:'',type_of_car_buffers:'',no_of_counter_weight_buffer:'',
    type_of_cwt_buffer:'',	e_light:null,e_alarm:null,e_intercom:null,	ard_operation:null,ard_audio:null,ard_visual:null,fireman_operation:null,
    fer:null,fireman_audio:null,fireman_visual:null,manual_rescue:null,passenger_overload_operation:null,passenger_overload_visual:null,passenger_overload_audio:null,
    seismic_sensor_operation:null}



    // unit id array
    unit_array: string[] = [];





documentidForUrl: string="";




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
   
    // Continue adding all elevator data...
  ];


  


  remark = 'All snags should be attended and completed to improve the ratings and performance of the elevators.';

  constructor(private apicallservice:ApicallService,private route: ActivatedRoute){
    // this.getData()
  }
  ngOnInit(): void {
    this.contractNo = this.route.snapshot.params['contractNumber'];
    this.documentidForUrl = decodeURIComponent(this.route.snapshot.params['documentid_For_Url']);
    console.log("---->",this.contractNo, this.documentidForUrl);
      this.apicallservice.getinfdata_forReport(this.contractNo).subscribe((result:any)=>{
      if(result.length >0 && result){
        this.apicallservice.getUnit_details_Report(this.contractNo).subscribe((unit:any)=>{
          if(unit)
          {
           
            this.apicallservice.getBrief_spec_value(this.documentidForUrl,unit[0].unit_no).subscribe((brief:any)=>{

             
             this.unit_array =unit[0]. unit_no;
             console.log("unitarray",this.unit_array,this.unit_array.length)
              console.log("Brief", brief);



             
               


                for(let i=0;i<brief.length;i++)
                {
                  this.BriefsingleVal=brief[i];
                  this.BriefmultiDimArray.push(this.BriefsingleVal)
                }
                this.BriefmultiDimArray_cunt=this.BriefmultiDimArray.length;    
            
                console.log("0000",this.BriefmultiDimArray)


              

                   {
                   console.log("unit details",unit)
    
                   console.log("+_+_+",result)
                   this.projectName=result[0].project_name;
                   this.buildingNO=result[0].building_name;
                   this.place=result[0].location;
                   this.OEM=result[0].oem_details;
    
                  //  inspector array to key value pair
            
                   const jsonArray: any[] = JSON.parse(result[0].inspector_array);
                   const inspector_keyValuePairs: { [key: string]: any }[] = [];
            
                   jsonArray.forEach((obj) => {
                    const keyValue: { [key: string]: any } = {};
                    for (const key in obj) {
                      if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        const value = obj[key];
                        keyValue[key] = value;
                      }
                    }
                    inspector_keyValuePairs.push(keyValue);
                   });
    
                   console.log(inspector_keyValuePairs)
    
    
                   this.inspectorNameandCode=sessionStorage.getItem("UserName")
    
                    let matchedObject: { [key: string]: any } | undefined;
    
                     // Loop through each object in the inspector_keyValuePairs array
                    for (let i = 0; i < inspector_keyValuePairs.length; i++) {
                     const obj = inspector_keyValuePairs[i];
                       if (obj['name'] === this.inspectorNameandCode) {
                       matchedObject = obj; // Found a matching object
                       break; // Exit the loop once a match is found
                       }
                    }
    
                    if (matchedObject) {
                     console.log(matchedObject);
    
    
                         //  date validation
                     {
    
                     const dateObject: Date = new Date(matchedObject['fromDate']); // Parse the date string into a Date object
                     const dateObject1: Date = new Date(matchedObject['toDate']);
                     // Get day, month, and year components from the date object
                     const day: number = dateObject.getDate();
                     const month: number = dateObject.getMonth() + 1; // Months are zero-based (0 = January)
                     const year: number = dateObject.getFullYear();
    
                    const day1: number = dateObject.getDate();
                    const month1: number = dateObject.getMonth() + 1; // Months are zero-based (0 = January)
                    const year1: number = dateObject.getFullYear();
    
                    // Format day, month, and year components with leading zeros if necessary
                    const formattedDay: string = day < 10 ? '0' + day : day.toString();
                    const formattedMonth: string = month < 10 ? '0' + month : month.toString();
                    const formattedYear: string = year.toString();
    
                    const formattedDay1: string = day1 < 10 ? '0' + day1 : day1.toString();
                    const formattedMonth1: string = month1 < 10 ? '0' + month1 : month1.toString();
                    const formattedYear1: string = year1.toString();
                    // Construct the final DD/MM/YYYY formatted date string
                    this.Rep_From= formattedDay + '/' + formattedMonth + '/' + formattedYear;
                    this.Rep_to= formattedDay1 + '/' + formattedMonth1 + '/' + formattedYear1;
    
    
                     }
    
                   this.nos_Product=matchedObject['units']
    
    
                   if(unit[0].inspector_name=== matchedObject['name'] ){
                   this.inspectedBy= unit[0].inspector_name.split('-')[0].trim();
                   }
                   else{
                      this.inspectedBy= matchedObject['name'].split('-')[0].trim();
                    }
                  } 
                 else {
                    console.log("No match found for:", this.inspectorNameandCode);
                 }
    
    
    
    
                 this.headervalue=this.contractNo.replace(/-/g, "/")+"/"+this.OEM+"/"+this.projectName+"/"+this.buildingNO+"/"+this.place+"/"+this.charactersAfterSecondSlash+"/REV 01"
             
      
                 const currentDate = new Date();
    
                             // Extract day, month, and year from the current date
                             const day = String(currentDate.getDate()).padStart(2, '0'); // Ensure two digits for day
                             const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
                             const year = currentDate.getFullYear();
     
                             // Create the time string in "DD/MM/YYYY" format
                             this.approvedDate = `${day}/${month}/${year}`;
    
    
    
    
                              //  get witness data
              
    
                              try {
                                this.witnessDetailsArray = JSON.parse(unit[0].witness_details);
                              } catch (error) {
                                console.error("Error parsing JSON:", error);
                              }
              
                        // Process the array if parsing was successful
                        if (Array.isArray(this.witnessDetailsArray)) {
                           const witness_detailskeyvalue: { [key: string]: string }[] = [];
              
                              console.log("Parsed array:", this.witnessDetailsArray);
              
                               this.witnessDetailsArray.forEach((obj: any) => {
                               const keyValue: { [key: string]: string } = {};
                               for (const key in obj) {
                                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                                keyValue[key] = obj[key];
                               }
                           }
                          witness_detailskeyvalue.push(keyValue);
                  });
              
                  console.log("Key-value pairs:", witness_detailskeyvalue);
              } else {
                  console.error("Parsed value is not an array");
              }         
   
                   }

            },(brief_error:any)=>{});


           
        
        }},(error:any)=>{
          alert("Error: "+error)

        })
      }
      else{
        alert("Contract number Not Ava.")
      }
        })
    
   
  }

  previewImage(event: any, previewId: string, inputId: string): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const preview = document.getElementById(previewId);
      if (preview) {
        const img = new Image();
        img.src = e.target.result;
        img.classList.add('preview');
        img.style.width = '100px'; // Set width to 100 pixels
        img.style.height = '100px'; // Set height to 100 pixels
        preview.innerHTML = '';
        preview.appendChild(img);
      }

      // Hide the file input field
      const inputElement = document.getElementById(inputId);
      if (inputElement) {
        inputElement.style.display = 'none';
      }
    };

    reader.readAsDataURL(file);
  }

  printContent(): void {
    window.print();
  }



   // Define rating data
  ratingData: RatingData = {
    header: "QUALITY EVALUATION AND PERFORMANCE RATING",
    address: "PAPL/0268/B/KONE/One International Center/One International Center/1 No./Parel, Mumbai/2024/REV 00"
  };

 


}




  
