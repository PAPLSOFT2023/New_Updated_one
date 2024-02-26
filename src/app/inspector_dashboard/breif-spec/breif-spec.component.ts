import { Component,ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { DataService } from 'src/app/data.service';
import { ApicallService } from 'src/app/apicall.service';
import { inspector } from 'src/app/sidenav/nav-data';

@Component({
  selector: 'app-breif-spec',
  templateUrl: './breif-spec.component.html',
  styleUrls: ['./breif-spec.component.scss']
})
export class BreifSpecComponent {
  video: any;
  val:string | null='';
  name:string | null ='';
  document_id:string | null ='';
  unit_no:string|null='';
  values:string[]=[];

  //breif spec variables
  oem:string='';
  elevator_number:string='';
  type_of_equipment:string='';
  year_of_manufacture:string='';
  type_of_usage:string='';
  machine_location:string='';
  controller_drive_type:string='';
  controller_name_as_per_oem:string='';
  type_of_operation:string='';
  grouping_type:string='';
  name_of_the_group:string='';
  floor_details:string='';
  openings:string='';
  floor_designations:string='';
  front_opening_floors:string='';
  rear_opening_floors:string='';
  non_stop_service_floors:string='';
  emergency_stop_floors:string='';
  rope_category:string='';
  no_of_ropes_belts:string='';
  rope_size:string='';
  no_of_drive_sheave_grooves:string='';
  ropes_wrap_details:string='';
  type_of_roping:string='';
  machine_type:string='';
  kilo_watt:string='';
  voltage:string='';
  current_in_ampere:string='';
  frequency:string='';
  rpm:string='';
  insulation_class:string='';
  ingress_protection:string='';
  no_of_poles:string='';
  st_hr:string='';
  serial_no:string='';
  rope_dia:string='';
  normal_speed:string='';
  electrical_tripping_speed:string='';
  mechanical_tripping_speed:string='';
  cwt_governor_details:boolean=false;
  door_operator:string='';
  cwt_rope_dia:string='';
  cwt_normal_speed:string='';
  cwt_electrical_tripping_speed:string='';
  cwt_mechanical_tripping_speed:string='';
  entrance_width:string='';
  entrance_height:string='';
  type_of_openings:string='';
  cabin_width:string='';
  cabin_height:string='';
  no_of_car_operating_panels:string='';
  car_indicator_type:string='';
  multimedia_display:string='';
  no_cabin_fans:string='';
  type_of_cabin_fan:string='';
  type_of_call_buttons:string='';
  stop_button:string='';
  service_cabinet:string='';
  voice_announcement:string='';
  handrail:string='';
  cabin_bumper:string='';
  auto_attendant:string='';
  auto_independant:string='';
  non_stop:string='';
  fan_switch:string='';
  hall_indicator_type:string='';
  hall_laterns:string='';
  arrival_chime:string='';
  no_of_risers_at_main_lobby:string='';
  no_of_risers_at_other_floors:string='';
  hall_call_type_at_main_lobby:string='';
  hall_call_type_at_all_floors:string='';
  no_of_car_buffers:string='';
  type_of_car_buffers:string='';
  no_of_cwt_buffer:string='';
  type_of_cwt_buffer:string='';
  e_light:boolean=false;
  e_alarm:boolean=false;
  e_intercom:boolean=false;
  ard_operation:boolean=false;
  ard_audio:boolean=false;
  ard_visuals:boolean=false;
  fireman_operation:boolean=false;
  fireman_emerg_return:boolean=false;
  fireman_audio:boolean=false;
  fireman_visual:boolean=false;
  passenger_overload_operation:boolean=false;
  passenger_overload_visual:boolean=false;
  passenger_overload_audio:boolean=false;
  seismic_sensor_operation:boolean=false;
  manual_rescue:string='';


  constructor(private route: ActivatedRoute,private dataService: ApicallService,private http :HttpClient,private router:Router){
     this.route.paramMap.subscribe(params => {
      this.val = params.get('c_no');
      console.log(this.val);
      
    });

  }
  ngOnInit(){
    this.document_id = sessionStorage.getItem('document_id');
    console.log('document id is ',this.document_id);
    this.unit_no=sessionStorage.getItem('unit_no');
    console.log('unit number is',this.unit_no);
    console.log('section is ',this.val);
    this.name = sessionStorage.getItem('UserName') as string;
    console.log('inspector name',this.name);

    this.http.get<string[]>('http://localhost:3000/api/vendor').subscribe((data) => {
      this.values = data;
      console.log(this.values);
      
    });

    }
  check(){
    console.log('elevator number is ',this.elevator_number);
    
  }

  submit(){
    console.log(this.manual_rescue);
    
 
    const values = {
      inspector_name:this.name,
      document_id:this.document_id,
      unit_no:this.unit_no,
      
      oem:this.oem,
      elevator_number:this.elevator_number,
      type_of_equipment:this.type_of_equipment,
      year_of_manufacture:this.year_of_manufacture,
      type_of_usage:this.type_of_usage,
      machine_location:this.machine_location,
      controller_drive_type:this.controller_drive_type,
      controller_name_as_per_oem:this.controller_name_as_per_oem,
      type_of_operation:this.type_of_operation,
      grouping_type:this.grouping_type,
      name_of_the_group:this.name_of_the_group,
      floor_details:this.floor_details,
      openings:this.openings,
      floor_designations:this.floor_designations,
      front_opening_floors:this.front_opening_floors,
      rear_opening_floors:this.rear_opening_floors,
      non_stop_service_floors:this.non_stop_service_floors,
      emergency_stop_floors:this.emergency_stop_floors,
      rope_category:this.rope_category,
      no_of_ropes_belts:this.no_of_ropes_belts,
      rope_size:this.rope_size,
      no_of_drive_sheave_grooves:this.no_of_drive_sheave_grooves,
      ropes_wrap_details:this.ropes_wrap_details,
      type_of_roping:this.type_of_roping,
      machine_type:this.machine_type,
      kilo_watt:this.kilo_watt,
      voltage:this.voltage,
      current_in_ampere:this.current_in_ampere,
      frequency:this.frequency,
      rpm:this.rpm,
      insulation_class:this.insulation_class,
      ingress_protection:this.ingress_protection,
      no_of_poles:this.no_of_poles,
      st_hr:this.st_hr,
      serial_no:this.serial_no,
      rope_dia:this.rope_dia,
      normal_speed:this.normal_speed,
      electrical_tripping_speed:this.electrical_tripping_speed,
      mechanical_tripping_speed:this.mechanical_tripping_speed,
      cwt_governor_details:this.cwt_governor_details,
      door_operator:this.door_operator,
      cwt_rope_dia:this.cwt_rope_dia,
      cwt_normal_speed:this.cwt_normal_speed,
      cwt_electrical_tripping_speed:this.cwt_electrical_tripping_speed,
      cwt_mechanical_tripping_speed:this.cwt_mechanical_tripping_speed,
      entrance_width:this.entrance_width,
      entrance_height:this.entrance_height,
      type_of_openings:this.type_of_openings,
      cabin_width:this.cabin_width,
      cabin_height:this.cabin_height,
      no_of_car_operating_panels:this.no_of_car_operating_panels,
      car_indicator_type:this.car_indicator_type,
      multimedia_display:this.multimedia_display,
      no_cabin_fans:this.no_cabin_fans,
      type_of_cabin_fan:this.type_of_cabin_fan,
      type_of_call_buttons:this.type_of_call_buttons,
      stop_button:this.stop_button,
      service_cabinet:this.service_cabinet,
      voice_announcement:this.voice_announcement,
      handrail:this.handrail,
      cabin_bumper:this.cabin_bumper,
      auto_attendant:this.auto_attendant,
      auto_independant:this.auto_independant,
      non_stop:this.non_stop,
      fan_switch:this.fan_switch,
      hall_indicator_type:this.hall_indicator_type,
      hall_laterns:this.hall_laterns,
      arrival_chime:this.arrival_chime,
      no_of_risers_at_main_lobby:this.no_of_risers_at_main_lobby,
      no_of_risers_at_other_floors:this.no_of_risers_at_other_floors,
      hall_call_type_at_main_lobby:this.hall_call_type_at_main_lobby,
      hall_call_type_at_all_floors:this.hall_call_type_at_all_floors,
      no_of_car_buffers:this.no_of_car_buffers,
      type_of_car_buffers:this.type_of_car_buffers,
      no_of_cwt_buffer:this.no_of_cwt_buffer,
      type_of_cwt_buffer:this.type_of_cwt_buffer,
      e_light:this.e_light,
      e_alarm:this.e_alarm,
      e_intercom:this.e_intercom,
      ard_operation:this.ard_operation,
      ard_audio:this.ard_audio,
      ard_visuals:this.ard_visuals,
      fireman_operation:this.fireman_operation,
      fireman_emerg_return:this.fireman_emerg_return,
      fireman_audio:this.fireman_audio,
      fireman_visual:this.fireman_visual,
      passenger_overload_operation:this.passenger_overload_operation,
      passenger_overload_visual:this.passenger_overload_visual,
      passenger_overload_audio:this.passenger_overload_audio,
      seismic_sensor_operation:this.seismic_sensor_operation,
      manual_rescue:this.manual_rescue 

    }
    this.http.post('http://localhost:3000/api/breif_spec_add', values).subscribe(
      (response) => {
        this.router.navigate(['afterlogin', 'unit',this.document_id]);
        console.log('saved successfully...!');
        

        
      },
      (error) => {
        console.error('Error storing data', error);
      }
    );
}
}
