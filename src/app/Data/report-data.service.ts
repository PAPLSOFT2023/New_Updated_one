import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportDataService {
  Orderd_parts:string[]= [];
  // 'PIT','CABIN', 'CAR TOP', 'MACHINE ROOM','FLOOR LANDING'
  Dataservice_Record_Values:{
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

  Order_unit:string[]=[];

  // Quality evaluation 
  first:string[]=["EMERGENCY ALARM","EMERGENCY LIGHT","INTERCOM FUNCTION","ARD OPERATION","MANUAL BRAKE RELEASE DEVICE & INSTRUCTIONS","FIREMAN OPERATION"];
  second:string[]=["PIT & EQUIPMENTS","TRAILING CABLE CONDITION","UNDER SIDE OF THE CAR","BUFFER & CLEARANCES","SAFETY ACCESSORIES"];
  third:string[]=["CABIN & FIXTURE","CAR DOOR & GAP WITH PANELS","DOOR OPERATION & PROTECTION","RIDING QUALITY","START /ACC& DEC/ JERKS","LEVELING"];
  fourth:string[]=["CAR TOP ACCESSARIES & EARTHING","CAR TOP BALUSTRADE & EMERGEN. EXIT","CAR & CWT GUIDES","MIDWAY T.C & CWT CONDITION","HOIST WAY EQUIPMENTS & FASCIA"];
  fifth:string[]=["M/c ROOM /MRL - CONDTION","EARTHING","MACHINE & SHEAVE CONDITION","ROTATING EQUIPMENTS GUARDING","HOIST ROPES/GOV. ROPE/BELTS","CONTROLLER & CONDITION","GOVERNOR & ACCESSORIES","OVERBALANCING & CURRENT READINGS"];
  sixth:string[]=["UNLOCKING DEVICE/ACCESSIBLE HEIGHT","LANDING DOORS & HALL FIXTURES","SIMPLEX/DUPLEX/ GROUPING"];
  seventh:string[]=["CUSTOM. SCOPE OF WORK"];

  constructor() { }
}
