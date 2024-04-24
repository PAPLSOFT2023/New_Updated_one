import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportDataService {
  Orderd_parts:string[]= ['PIT','CABIN', 'CAR TOP', 'MACHINE ROOM','FLOOR LANDING'];
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
  constructor() { }
}
