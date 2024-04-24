import { Component,ChangeDetectionStrategy } from '@angular/core';
import { ApicallService } from '../../../apicall.service';
import { ActivatedRoute } from '@angular/router';
import { ReportDataService } from 'src/app/Data/report-data.service';



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
  styleUrls: ['./report-for-elev.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
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
Ordered_unit:string[]=[];
Ordered_unit_count:number;

// for quality evaluation 
 
 



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



// BriefsingleVal:{id: number, document_id: number, inspector_name: string,speed:string,unit_no:string,capacity:string,elevator_number:string, 	oem: string, year_of_manufacture: string,	machine_location:string,controller_driver_type:string,controller_name_as_per_oem:string,
//   type_of_equipment:string,type_of_usage:string,type_of_operation:string,grouping_type:string,	name_of_the_group:string,floor_stops:string,floor_opening:string,floor_designation:string,front_opening_floors:string,	rear_opening_floors:string,
//   service_floors:string,	emergency_stop_floors:string,rope_category:string,	number_of_rope_belt:string,	rope_size:string,no_of_drive_sheave_grooves:string,
//   ropes_wrap_details:string,type_of_roping:string,	machine_type:string,	motor_kilo_watt:string,motor_voltage:string,motor_current_in_ampere:string,
//   motor_frequency:string,motor_rpm:string,motor_insulation_class:string,motor_ingress_protection:string,	motor_no_of_poles:string,	motor_st_hr:string,
//   motor_serial_number:string,	car_governor_rope_dia:string,car_governor_normal_speed:string,car_governor_electric_tripping_speed:string,car_governor_mechanical_tripping_speed:string,
//   cwt_governor:any,cwt_governor_rope_dia:string,cwt_governor_normal_speed:string,cwt_governor_electrical_tripping_speed:string,cwt_governor_mechanical_tripping_speed:string,
//   door_operator:string,entrance_height:string,entrance_width:string,entrance_type_of_opening:string,	cabin_height:string,cabin_width:string,no_of_cop:string,car_indicator_type:string,
//   multimedia_display:string,	no_of_cabin_fans:string,type_of_cabin_fans:string,type_of_call_buttons:string,	car_stop_button:string,car_service_cabinet:string,
//   car_voice_announcement:string,car_handrail:string,car_cabin_bumper:string,car_auto_attendant:string,car_auto_independent:string,	car_non_stop:string,car_fan_switch:string,
//   hall_indicator_type:string,hall_lantems:string,hall_arrival_chime:string,	no_of_risers_at_main_lobby:string,no_of_risers_at_other_floors:string,
//   hall_call_type_at_main_lobby:string,	hall_call_type_at_all_floors:string,	no_of_car_buffers:string,type_of_car_buffers:string,no_of_counter_weight_buffer:string,
//   type_of_cwt_buffer:string,	e_light:any,e_alarm:any,e_intercom:any,	ard_operation:any,ard_audio:any,ard_visual:any,fireman_operation:any,
//   fer:any,fireman_audio:any,fireman_visual:any,manual_rescue:any,passenger_overload_operation:any,passenger_overload_visual:any,passenger_overload_audio:any,
//   seismic_sensor_operation:any}={id: 0, document_id: 0, inspector_name: '',speed:'',unit_no:'',capacity:'',elevator_number:'', 	oem: '', year_of_manufacture: '',	machine_location:'',controller_driver_type:'',controller_name_as_per_oem:'',
//     type_of_equipment:'',type_of_usage:'',type_of_operation:'',grouping_type:'',	name_of_the_group:'',floor_stops:'',floor_opening:'',floor_designation:'',front_opening_floors:'',	rear_opening_floors:'',
//     service_floors:'',	emergency_stop_floors:'',rope_category:'',	number_of_rope_belt:'',	rope_size:'',no_of_drive_sheave_grooves:'',
//     ropes_wrap_details:'',type_of_roping:'',	machine_type:'',	motor_kilo_watt:'',motor_voltage:'',motor_current_in_ampere:'',
//     motor_frequency:'',motor_rpm:'',motor_insulation_class:'',motor_ingress_protection:'',	motor_no_of_poles:'',	motor_st_hr:'',
//     motor_serial_number:'',	car_governor_rope_dia:'',car_governor_normal_speed:'',car_governor_electric_tripping_speed:'',car_governor_mechanical_tripping_speed:'',
//     cwt_governor:null,cwt_governor_rope_dia:'',cwt_governor_normal_speed:'',cwt_governor_electrical_tripping_speed:'',cwt_governor_mechanical_tripping_speed:'',
//     door_operator:'',entrance_height:'',entrance_width:'',entrance_type_of_opening:'',	cabin_height:'',cabin_width:'',no_of_cop:'',car_indicator_type:'',
//     multimedia_display:'',	no_of_cabin_fans:'',type_of_cabin_fans:'',type_of_call_buttons:'',	car_stop_button:'',car_service_cabinet:'',
//     car_voice_announcement:'',car_handrail:'',car_cabin_bumper:'',car_auto_attendant:'',car_auto_independent:'',	car_non_stop:'',car_fan_switch:'',
//     hall_indicator_type:'',hall_lantems:'',hall_arrival_chime:'',	no_of_risers_at_main_lobby:'',no_of_risers_at_other_floors:'',
//     hall_call_type_at_main_lobby:'',	hall_call_type_at_all_floors:'',	no_of_car_buffers:'',type_of_car_buffers:'',no_of_counter_weight_buffer:'',
//     type_of_cwt_buffer:'',	e_light:null,e_alarm:null,e_intercom:null,	ard_operation:null,ard_audio:null,ard_visual:null,fireman_operation:null,
//     fer:null,fireman_audio:null,fireman_visual:null,manual_rescue:null,passenger_overload_operation:null,passenger_overload_visual:null,passenger_overload_audio:null,
//     seismic_sensor_operation:null}



    // inspection master 
     inspectionMasterData:{ id: number;
      Product: string;
      Parts: string;
      Description: string;
      Reference: string[];
      Risklevel:string[];
      Dropdown:string[];
      Photo:string[];
      for_defect_flag:boolean;
      Defect_photo:string;
      Defect_multiple:string;
      image_Blob:any;
    }[]= []



      // Record Values


      Record_Values:{
        checked:boolean;
        description:string;
        document_id:number;
        dropdown_option:string;
        id:number;
        img:any;
        inspector_name:string;
        needforReport:boolean;
        section:string;
        unit_no:string,
        Customer_Scope:boolean,
        Emergency_Features:boolean,
        Negative_ADJ:number,
        Negative_MNT:number,
        Positive_ADJ:number,
        Positive_MNT:number
      
      }[]=[]

        val:number[]=[]


        emergency_Table_Data:{unit_no:string,Emergency_al:string,Emergency_Li:string,Intercom:string,ARd:string,Fireman:string,Manual_Res:string}[]=[]

  
   

    // unit id array
    unit_array: string[] = [];


    Error_API:string='';
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
  Result_Of_pit_variables: { [key: string]: { unit: string, status: string, image: any, report_string: string,has_image:boolean,actual_description:string }[] } = {};

  Quality_value:{[key: string]:{ADJ:number,MNT:number}}={}
    
  Mul_Result_Of_pit_variables:any[]=[]
  


  remark = 'All snags should be attended and completed to improve the ratings and performance of the elevators.';

  constructor(private apicallservice: ApicallService, private route: ActivatedRoute,public dataservice:ReportDataService) {
    
    this.contractNo = this.route.snapshot.params['contractNumber'];
    this.documentidForUrl = decodeURIComponent(this.route.snapshot.params['documentid_For_Url']);
    this.Ordered_unit=this.dataservice.Order_unit
    this.Ordered_unit_count=this.Ordered_unit.length
    console.log("orderedunit",this.Ordered_unit);
    
    this.apicallservice.getinspectionmaster_description_for_Variable("pit").subscribe((result: any[]) => {
      if (result) {
        
        this.initializeUnits();
        result.forEach((item: any, index: number) => {
            const description = item.Description.replace(/[^\w]+/gi, '_');
            const propertyName = `${description}`;
            this.Result_Of_pit_variables[propertyName] = [{ unit: "", status: "Y", image: null, report_string: "",has_image:false,actual_description:item.Description}];
            
        });
      }

    });
}

private initializeUnits() {
  this.Ordered_unit.forEach((unitName, index) => {
      this.Quality_value[unitName] = { MNT: 0, ADJ: 0 }; // Dynamically create properties p1, p2, etc.
  });
}







  ngOnInit(): void {

    

    
      this.apicallservice.getinfdata_forReport(this.contractNo).subscribe((result:any)=>{
      if(result.length >0 && result){
        console.log("INF",result)
        this.apicallservice.getUnit_details_Report(this.documentidForUrl,this.contractNo).subscribe((unit:any)=>{
          if(unit)
          {
            console.log("Unit details",unit)
            console.log("---->",this.contractNo, this.documentidForUrl,unit[0].unit_no);
            this.apicallservice.getBrief_spec_value(this.documentidForUrl,this.Ordered_unit).subscribe((brief:any)=>{
              if(brief.length>0) 
              {        console.log("Brief spec",brief);
              

                this.apicallservice.getinsectionmasterData().subscribe((inspectionMaster:any)=>{
                  if(inspectionMaster)
                  {
                    console.log("inspecection master",inspectionMaster)
                    this.apicallservice.getChecklist_Record_Val(this.documentidForUrl).subscribe((record_data:any)=>{
                      if(record_data)
                      {

                        console.log("Val",record_data)
                        
                        // Record_Values
                        record_data.forEach((item: any) => {
                          const recordValue = {
                            checked: item.checked,
                            description: item.description,
                            document_id: item.document_id,
                            dropdown_option: item.dropdown_option,
                            id: item.id,
                            img: item.img,
                            inspector_name: item.inspector_name,
                            needforReport: item.needforReport,
                            section: item.section,
                            unit_no: item.unit_no,
                            Customer_Scope:item.Customer_Scope,
                            Emergency_Features:item.Emergency_Features,
                            Negative_ADJ:item.Negative_ADJ,
                            Negative_MNT:item.Negative_MNT,
                            Positive_ADJ:item.Positive_ADJ,
                            Positive_MNT:item.Positive_MNT
                          };
                          this.Record_Values.push(recordValue);
                        });
                       
                        // inspectionMasterData
                        for (const item of inspectionMaster) {
                          const inspectionMasterData_single = {
                            id: item.id,
                            Product: item.Product,
                            Description: item.Description,
                            Parts: item.Parts,
                            Photo: item.Photo.split("~"),
                            Reference: item.Reference.split("~"),
                            Risklevel: item.Risklevel.split("~"),
                            Dropdown: item.Dropdown.split("~"),
                            for_defect_flag:false,
                            Defect_photo:"",
                            Defect_multiple:"",
                            image_Blob:""
                            
                          };
                          
                          this.inspectionMasterData.push(inspectionMasterData_single);
                        }
                        // BriefmultiDimArray
                        for (const item of brief) {
                          this.BriefmultiDimArray.push(item);
                        }
                        
                        
                        console.log("unit details",unit)
                        console.log("+_+_+",result)

                        console.log("brief",brief);
                        console.log("inspectionMaster",this.inspectionMasterData);  
                        console.log("record_Val",this.Record_Values)
                       
                        
                           
                        
                           
                             this.BriefmultiDimArray_cunt=this.BriefmultiDimArray.length;  
                          
                             
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
                                if (Object.hasOwn(obj, key)) {
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
                               for (const element of inspector_keyValuePairs) {
                                const obj = element;
                                  if (obj['name'] === this.inspectorNameandCode) {
                                  matchedObject = obj; // Found a matching object
                                  break; // Exit the loop once a match is found
                                  }
                               }
               
                               if (matchedObject) {
                              

                                
               
                                const dateObject: Date = new Date(matchedObject['fromDate']); // Parse the date string into a Date object
                                const dateObject1: Date = new Date(matchedObject['toDate']);
                                // Get day, month, and year components from the date object
                                const day: number = dateObject.getDate();
                                const month: number = dateObject.getMonth() + 1; // Months are zero-based (0 = January)
                                const year: number = dateObject.getFullYear();
               
                               const day1: number = dateObject1.getDate();
                               const month1: number = dateObject1.getMonth() + 1; // Months are zero-based (0 = January)
                               const year1: number = dateObject1.getFullYear();
               
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
                                   
                                    this.witnessDetailsArray = this.witnessDetailsArray.filter(obj =>
                                      Object.values(obj).some(value => value !== '' && value !== null)
                                    );
                         
                                         console.log("Parsed array:", this.witnessDetailsArray);
                         
                                       
                        
                        
                                    } 
                                    else {
                                     console.error("Parsed value is not an array");
                                    }         
              




                       console.log("Result_Of_pit_variables:", this.Result_Of_pit_variables);
                       this.checkEmergency();
                       
                       this.Pit_Report_Gen();
                       this.Report_Quality_Gen();
                        
  
                      
                      }
                      
                      
                      
                      
                      
                      
                    
                      else{
                        console.log("Error_API Check list Record is Empty")
                        this.Error_API="Check list Record is Empty "

                      }
                    })




                  }
                  else{
                    console.log("Error_API Check List Data is Empty+")
                    this.Error_API=this.Error_API+"Check List Data is Empty "
                  }


                })
               
              }
              else{
                console.log("Error_API Check List Data is Empty-")
                
                this.Error_API=this.Error_API+"Brief Data is Empty"
              }



            },(brief_error:any)=>{});
          }
          else{
            console.log("Error_API Check List Data is Empty")
            this.Error_API=this.Error_API+"Unit Data is Empty "
          }


           
        
       },(error:any)=>{
          alert("Error: "+error)

        })
      }
      else{
        alert("Contract number Not Ava.")
      }
        })





    


   
   
  }

 



   // Define rating data
  ratingData: RatingData = {
    header: "QUALITY EVALUATION AND PERFORMANCE RATING",
    address: "PAPL/0268/B/KONE/One International Center/One International Center/1 No./Parel, Mumbai/2024/REV 00"
  };

 

  checkConstraints(imaster_index:number,index: number, checklistmaster_Description: string): string {
    // Loop through your Record_Values array to find if conditions match
    // console.log("parameters",imaster_index,index,checklistmaster_Description);
    //   for (const recordValueChecked of this.Record_Values  ) {

        
    //    if (checklistmaster_Description === recordValueChecked.description &&  recordValueChecked.unit_no === this.BriefmultiDimArray[index].unit_no) {     
    //       if (recordValueChecked.checked)
    //        {
    //         this.inspectionMasterData[imaster_index].for_defect_flag=true
    //         console.log("**********11",recordValueChecked.needforReport,recordValueChecked.dropdown_option) 
    //         if(recordValueChecked.needforReport){
    //           this.inspectionMasterData[imaster_index].image_Blob=recordValueChecked.img
    //            this.inspectionMasterData[imaster_index].Defect_photo=recordValueChecked.dropdown_option
    //            this.inspectionMasterData[imaster_index].Defect_multiple ="shgfdjgfdkghdfk"                      
    //          }
    //         else{
    //           this.inspectionMasterData[imaster_index].Defect_multiple = this.inspectionMasterData[imaster_index].Defect_multiple+"\n"+ recordValueChecked.dropdown_option;
    //           console.log("**********",this.inspectionMasterData[imaster_index].Defect_multiple)
    //         }            
    //         // console.log("----->NO",recordValueChecked.checked)
    //         return "NO"; // If any checked value is true, return "NO"
    //       }
    //       else
    //       {
    //         console.log("----->yes1",recordValueChecked.description,  recordValueChecked.unit_no)
    //         return "YES"; 

    //       }
        
      
       
        
    //   }
    //   else{
    //     console.log("++",checklistmaster_Description === recordValueChecked.description,recordValueChecked.unit_no === this.BriefmultiDimArray[index].unit_no)
    //   }
    // }
  

 
    console.log("----->yes2")
    return "YES!"; // If conditions don't match, default to "YES"
  }



  Report_Quality_Gen()
  {
    this.apicallservice.getQuality_emergency(this.documentidForUrl,this.Ordered_unit).subscribe((result_emergency:any)=>{
      if(result_emergency)
        {
         console.log("^^*",result_emergency);
         
          
         for(const unit of this.Ordered_unit)
          {
            let const_Mnt:number=0;
            let const_Adj:number=0;
           for (const  dataarray_first of this.dataservice.first)
            {
             

                let flag_check:boolean=false;
                let temp_Mnt:number=0;
                let temp_Adj:number=0;
                let temp_positive_Mnt:number=0;
                let temp_positive_Adj:number=0;
                for(const Singleresult_emergency of result_emergency)
                  {
                    if(dataarray_first == Singleresult_emergency.description)
                      {


                         if(Singleresult_emergency.checked)
                          {
                            flag_check=true

                          }
                          else{
                            temp_positive_Adj=Singleresult_emergency.Positive_ADJ;
                            temp_positive_Mnt=Singleresult_emergency.Positive_MNT;
                          }                   
                      }
                  }
                  if(flag_check)
                    {


                      
                    }
                    else{
                      const_Adj=const_Adj+temp_positive_Adj;
                      const_Mnt=const_Mnt+temp_positive_Mnt;
                    }

                
           }
          }
          
        }


    });
  }


  checkEmergency() {   

    let emergency_AL_flag:boolean=false
    let emergency_AL_string:string=""
    let emergency_LI_flag:boolean=false
    let emergency_LI_string:string=""
    let intercom_flag:boolean=false
    let intercom_string:string=""
    let ard_flag:boolean=false
    let ard_string:string=""
    let fireman_flag:boolean=false
    let fireman_string:string=""
    let manual_break_flag:boolean=false
    let manual_break_string:string=""
    
    for (const brief of this.BriefmultiDimArray) {      
      for (const record of this.Record_Values) {
       
       
        // cabin Emergency alaram
          if (brief.unit_no === record.unit_no && "cabin".toLowerCase() === record.section.toLowerCase() && "EMERGENCY ALARM".toLowerCase() === record.description.toLowerCase()) {
           
           if(record.checked)
            {
              emergency_AL_flag=true;
              if(emergency_AL_string)
                {
                  emergency_AL_string+=", "+record.dropdown_option
                }
                else{
                  emergency_AL_string=record.dropdown_option
                }
            }
          } 
         
          // emergency light
          if (brief.unit_no === record.unit_no && "cabin".toLowerCase() === record.section.toLowerCase() && "EMERGENCY LIGHT".toLowerCase() === record.description.toLowerCase())
            {

            if(record.checked)
             {
               emergency_LI_flag=true;
               if(emergency_LI_string)
                 {
                   emergency_LI_string+=", "+record.dropdown_option
                 }
                 else{
                   emergency_LI_string=record.dropdown_option
                 }
             }
           } 
          //  Intercom

          if (brief.unit_no === record.unit_no && "cabin".toLowerCase() === record.section.toLowerCase() && "INTERCOM FUNCTION".toLowerCase() === record.description.toLowerCase())
            {
            
          if(record.checked)
            {
              intercom_flag=true;
              if(intercom_string)
                {
                  intercom_string+=", "+record.dropdown_option
                }
                else{
                  intercom_string=record.dropdown_option
                }
            }
          } 

          // ARD

          if (brief.unit_no === record.unit_no && "cabin".toLowerCase() === record.section.toLowerCase() && "ARD OPERATION".toLowerCase() === record.description.toLowerCase())
          {
          if(record.checked)
            {
              ard_flag=true;
              if(ard_string)
                {
                  ard_string+=", "+record.dropdown_option
                }
                else{
                  ard_string=record.dropdown_option
                }
            }
          } 

          // Fireman

          if (brief.unit_no === record.unit_no && "floor landing".toLowerCase() === record.section.toLowerCase() && "FIREMAN OPERATION".toLowerCase() === record.description.toLowerCase())
          {

          if(record.checked)
            {
              fireman_flag=true;
              if(fireman_string)
                {
                  fireman_string+=", "+record.dropdown_option
                }
                else{
                  fireman_string=record.dropdown_option
                }
            }
          }

          // manual break

          if (brief.unit_no === record.unit_no && "MACHINE ROOM".toLowerCase() === record.section.toLowerCase() && "MANUAL BRAKE RELEASE DEVICE & INSTRUCTIONS".toLowerCase() === record.description.toLowerCase()) 
          {
          if(record.checked)
            {
              manual_break_flag=true;
              if(manual_break_string)
                {
                  manual_break_string+=", "+record.dropdown_option
                }
                else{
                  manual_break_string=record.dropdown_option
                }
            }
          }
        }
           const template = {
           Emergency_al: "",
           Emergency_Li: "",
           Intercom: "",
           ARd: "",
           Fireman: "",
           Manual_Res: ""
          };

          if (emergency_AL_flag ) template.Emergency_al = emergency_AL_string; else template.Emergency_al="Working"
          if (emergency_LI_flag) template.Emergency_Li = emergency_LI_string;  else template.Emergency_Li="Working"
          if (intercom_flag) template.Intercom = intercom_string;              else template.Intercom="Working"
          if (ard_flag) template.ARd = ard_string;                             else template.ARd="Working"
          if (fireman_flag) template.Fireman = fireman_string;                 else template.Fireman="Working"
          if (manual_break_flag) template.Manual_Res = manual_break_string;    else template.Manual_Res="Working"
 

         const emergency_Table_Data = { unit_no: brief.unit_no, ...template };

         emergency_AL_flag=false;
         emergency_AL_string=""
         emergency_LI_flag=false;
         emergency_LI_string=""
         intercom_flag=false;
         intercom_string=""
         ard_flag=false;
         ard_string=""
         fireman_flag=false;
         fireman_string=""
         manual_break_flag=false;
         manual_break_string=""       
         this.emergency_Table_Data.push(emergency_Table_Data);
       }
        console.log("^^",this.emergency_Table_Data)
}


Pit_Report_Gen(){

  const selected_unit=['p1','p2','a1','a2']
  console.log("descarray","descArray")

//   for (const key of Object.keys(this.Result_Of_pit_variables)) {
//     const descArray = this.Result_Of_pit_variables[key];
    
//     for (const desc of descArray) {
//       console.log("desc+",descArray)
//         for (const brief of this.BriefmultiDimArray) { 
//           if (selected_unit.indexOf(brief.unit_no) !== -1) {
//            const desc_keyToFind="description";
//             const desc_valueToFind=desc.actual_description;
//              const unit=brief.unit_no;
//               const unit_key="unit_no"


//               const template = {
//                 unit:unit , status: "", image: null, report_string: "",has_image:false,actual_description:""};
//             for (const obj of this.Record_Values) {
//               if (obj.hasOwnProperty(desc_keyToFind) && obj[desc_keyToFind] === desc_valueToFind && obj.hasOwnProperty(unit_key) && obj[unit_key] === unit) {
                
//                 if(obj.checked)
//                 {
//                   template.unit=unit
//                    console.log(desc_keyToFind,desc_valueToFind,unit,unit_key)
//                    console.log("Row found:++",obj)
//                   template.status="N"
                  
//                    if(template.report_string)
//                     {
//                       // desc.report_string+=+", "+obj.dropdown_option
//                       template.report_string=template.report_string+", "+obj.dropdown_option
//                     }
//                     else{
//                       template.report_string=obj.dropdown_option

//                     }
//                     if(obj.img && obj.needforReport)
//                       {
//                         template.has_image=true;
//                         template.image=obj.img;
//                       }


//                 }



//               }
//             }

            


//           }
//         }
       
        
//     }
// }

console.log("PIT Report+",this.Result_Of_pit_variables)

}


}















  
