import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import{Observable, throwError}from 'rxjs';
import { query } from 'express';
import { catchError } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { ReturnStatement } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class ApicallService {
  
  
  
  
  



  
  total_units:number=0;

  private apiURLCommon='http://localhost:3000/';
  private apiURL=this.apiURLCommon+'api/';
  

  constructor(private httpClient:HttpClient,private http:HttpClient) { }

 
  // this func for load customerdata
Resend_mail_verification(email:string):Observable<any>{


    console.log("Api called",email)
    const url = `${this.apiURL}ResendVerificationLink`;
    const params = new HttpParams().set('Email', email);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = {
      headers: headers,
      params: params
    };
 
  return this.httpClient.get(url,options) ;
}
// NAME: string, email_id: string, PSN_NO: string, designation: string, contact_no: number, date_of_joining: Date, date_of_birth: Date, dept: string 
// In ApicallService
updateprofiledata(name:string ,email_id:string,PSN_NO:string,designation:string,contact_no:number,date_of_joining:Date,date_of_birth:Date,dept:string, existingemail: any): Observable<any> {
  console.log(name ,email_id,PSN_NO,designation,contact_no,date_of_joining,date_of_birth,dept,existingemail)
  const databody={name ,email_id,PSN_NO,designation,contact_no,date_of_joining,date_of_birth,dept,existingemail}
  return this.httpClient.put(this.apiURL+'update_profile',databody);
}




// profiledata deleteform 
deleteProfileData(emailId: string): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  console.log("api called", emailId);

  return this.httpClient.delete(`${this.apiURL}delete_emp_data`, { headers, body: { email_id: emailId } });
}




//profiledata add user form
addProfileData(NAME:string ,email_id:string,PSN_NO:string,designation:string,contact_no:number,date_of_joining:Date,date_of_birth:Date,dept:string): Observable<any> {
  const body={NAME,email_id,PSN_NO,designation,contact_no,date_of_joining,date_of_birth,dept}
  console.log("api Called",NAME,email_id,PSN_NO,designation,contact_no,date_of_joining,date_of_birth,dept)
  
  
  return this.httpClient.post(this.apiURL+"add_profile_data", body);
}

//inspector_cv 
getInspectorCv(): Observable<any> {
  return this.http.get(this.apiURL+'inspectorCv')
}
uploaCV(psn: string, pdf: File): Observable<any> {
  const formData = new FormData();
  formData.append('psn', psn);
  formData.append('pdf', pdf, pdf.name);

  return this.http.post(this.apiURL + 'inspector_cv_upload', formData)
    .pipe(
      catchError(this.handleError)
    );
}

private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    console.error('An error occurred:', error.error.message);
  } else {
    console.error(`Backend returned code ${error.status}, body was: ${JSON.stringify(error.error)}`);
  }

  return throwError('Something bad happened; please try again later.');
}





//emp_data database 
get_emp_data():Observable<any>{
  console.log("Api called")
  return  this.httpClient.get(this.apiURL+"get_emp_data");
}


get_Insp_Name_List():Observable<any>{

  console.log("api called")
  return this.httpClient.get(this.apiURL+"Get_Insp_List")
}


generatePDF():Observable<any>{
  console.log("wsdef")
  // this.httpClient.get(this.apiURL+"generate-pdf");
  return this.httpClient.get(this.apiURL+"generatepdf");
}


// leaveData():Observable<any>{
//   return this.httpClient.get(this.apiURL+"leaveData");
// }




profileInsert(organization_name:string,address:string,pincode:string,state:string,country:string,contact:string,organization:string):Observable<any>{
    const body={organization_name,address,pincode,state,country,contact,organization}

console.log("api Called",organization_name,address,pincode,state,country,contact,organization)
  return this.httpClient.post(this.apiURL+"profileInsert",body);
}


// get Dump_ usage data fro DB For UI Elements

getDump_usageData():Observable<any>{

  // console.log("api called")
  return this.httpClient.get(this.apiURL+'getDumpUsage');

}
// ADD DUMP USAGE
addDump_Usage(dump_usage:string):Observable<any>{
const body_Dump_Usage={dump_usage};
console.log("Api called")
  return this.httpClient.put(this.apiURL+'addDump_Usage',body_Dump_Usage);
}
// DELETE DUMP USAGE
delete_Dump_Usage_Data( dumpusage: string): Observable<any> {

  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
 console.log("api called")
  return this.httpClient.delete(`${this.apiURL}DumpUsage_Data_Delete`, { headers, body: {  dumpusage } });
}

// Get Dump type data
getDump_TypeData():Observable<any>{

  console.log("api called")
  return this.httpClient.get(this.apiURL+'getDumpType');

}
// ADD DUMP Type
addDump_Type(dump_type:string):Observable<any>{
  const body_Dump_Type={dump_type};
  console.log("Api called")
    return this.httpClient.put(this.apiURL+'addDump_Type',body_Dump_Type);
  }
// DELETE DUMP USAGE
delete_Dump_Type_Data( dumptype: string): Observable<any> {

  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
 console.log("api called")
  return this.httpClient.delete(`${this.apiURL}DumpType_Data_Delete`, { headers, body: {  dumptype } });
}
// get Home type
getHome_TypeData():Observable<any>{

  console.log("api called")
  return this.httpClient.get(this.apiURL+'getHomeType');

}
// addHome_Type
addHome_Type(home_type:string):Observable<any>{
  const body_home_Type={home_type};
  console.log("Api called")
    return this.httpClient.put(this.apiURL+'addHome_Type',body_home_Type);
  }

  //  DELETE Home Type
  delete_Home_Type_Data( hometype: string): Observable<any> {
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
   console.log("api called")
    return this.httpClient.delete(`${this.apiURL}HomeType_Data_Delete`, { headers, body: {  hometype } });
  }
// getHome_UsageData
getHome_UsageData():Observable<any>{

  console.log("api called")
  return this.httpClient.get(this.apiURL+'getHomeUsage');

}
// addHome_usage
addHome_usage(home_usage:string):Observable<any>{
  const body_home_Usage={home_usage};
  console.log("Api called")
    return this.httpClient.put(this.apiURL+'addHome_Usage',body_home_Usage);
  }

// delete_Home_Usage_Data

delete_Home_Usage_Data( homeusage: string): Observable<any> {
  
  const headers = new HttpHeaders({
      
  });
 console.log("api called")
  return this.httpClient.delete(`${this.apiURL}HomeUsage_Data_Delete`, { headers, body: {  homeusage } });
}
// get_Ins_Time_Data
get_Ins_Time_Data():Observable<any>{

  console.log("api called")
  return this.httpClient.get(this.apiURL+'get_Ins_Time_Data');

}
// addIns_time

addIns_time(ins_time:string):Observable<any>{
  const body_home_Usage={ins_time};
  console.log("Api called")
    return this.httpClient.put(this.apiURL+'addIns_time',body_home_Usage);
  }

// delete_Ins_time_Data1

delete_Ins_time_Data1( Ins_time: string): Observable<any> {
  
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
 console.log("api called")
  return this.httpClient.delete(`${this.apiURL}delete_Ins_time_Data1`, { headers, body: {  Ins_time } });
}


// get_Ins_Time_Insp_Data

get_Ins_Time_Insp_Data():Observable<any>{

  console.log("api called")
  return this.httpClient.get(this.apiURL+'get_Ins_Time_Insp_Data');

}
// addIns_time_insp

addIns_time_insp(ins_time_insp:string):Observable<any>{
  const body_home_Usage={ins_time_insp};
  console.log("Api called")
    return this.httpClient.put(this.apiURL+'ins_time_insp',body_home_Usage);
  }

// delete_Ins_time_insp_Data1
delete_Ins_time_insp_Data1( Ins_time_insp: string): Observable<any> {
  
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
 console.log("api called")
  return this.httpClient.delete(`${this.apiURL}delete_Ins_time_insp_Data1`, { headers, body: {  Ins_time_insp } });
}

// get_OEM_Data

get_OEM_Data():Observable<any>{

  console.log("api called")
  return this.httpClient.get(this.apiURL+'get_OEM_Data');

}
// addToOEM_Details


addToOEM_Details(oem_details:string):Observable<any>{
  const body_home_Usage={oem_details};
  console.log("Api called")
    return this.httpClient.put(this.apiURL+'oem_details',body_home_Usage);
  }

// delete_OEM_Data1

delete_OEM_Data1( OEM: string): Observable<any> {
  
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
 console.log("api called")
  return this.httpClient.delete(`${this.apiURL}delete_OEM_Data1`, { headers, body: {  OEM } });
}

// get_Region_Details
get_Region_Details():Observable<any>{

  console.log("api called")
  return this.httpClient.get(this.apiURL+'get_Region_Details');

}

// addToRegion_Details
addToRegion_Details(region_details:string):Observable<any>{
  const body_home_Usage={region_details};
  console.log("Api called")
    return this.httpClient.put(this.apiURL+'region_details',body_home_Usage);
  }
// delete_Region_Data1
delete_Region_Data1( Region: string): Observable<any> {
  
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
 console.log("api called")
  return this.httpClient.delete(`${this.apiURL}delete_Region_Data1`, { headers, body: {  Region } });
}
// get_Travel_Acc_Details
get_Travel_Acc_Details():Observable<any>{

  console.log("api called")
  return this.httpClient.get(this.apiURL+'get_Travel_Acc_Details');

}

// addToTravel_Acc_Details

addToTravel_Acc_Details(Travel_Acc_details:string):Observable<any>{
  const body_home_Usage={Travel_Acc_details};
  console.log("Api called")
    return this.httpClient.put(this.apiURL+'addToTravel_Acc_Details',body_home_Usage);
  }

// delete_Travel_Acc_Data1
delete_Travel_Acc_Data1( Region: string): Observable<any> {
  
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
 console.log("api called")
  return this.httpClient.delete(`${this.apiURL}delete_Travel_Acc_Data1`, { headers, body: {  Region } });
}

// get_Type_Ele

get_Type_Ele_Details():Observable<any>{

  console.log("api called")
  return this.httpClient.get(this.apiURL+'get_Type_Ele_Details');

}

// addToType_EleDetails


addToType_EleDetails(Travel_Acc_details:string):Observable<any>{
  const body_home_Usage={Travel_Acc_details};
  console.log("Api called")
    return this.httpClient.put(this.apiURL+'addToType_EleDetails',body_home_Usage);
  }
// delete_Type_ele_Data1


delete_Type_ele_Data1( Region: string): Observable<any> {
  
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
 console.log("api called")
  return this.httpClient.delete(`${this.apiURL}delete_Type_ele_Data1`, { headers, body: {  Region } });
}

// get_Type_Bul_Details

get_Type_Bul_Details():Observable<any>{

  console.log("api called")
  return this.httpClient.get(this.apiURL+'get_Type_Bul_Details');

}
// addToType_BulDetails


addToType_BulDetails(Travel_Acc_details:string):Observable<any>{
  const body_home_Usage={Travel_Acc_details};
  console.log("Api called")
    return this.httpClient.put(this.apiURL+'addToType_BulDetails',body_home_Usage);
  }
// delete_Type_Bul_Data1
delete_Type_Bul_Data1( Region: string): Observable<any> {
  
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
 console.log("api called")
  return this.httpClient.delete(`${this.apiURL}delete_Type_Bul_Data1`, { headers, body: {  Region } });
}

















deleteLoginDetails(email: string): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  // Pass email in the request body
  const bodyValue = { email: email };

  return this.httpClient.delete(this.apiURL + 'adminregister_login_delete', { headers, body: bodyValue });
}
  updateLoginData(email:string,organization:string,role:String,lstatus:number,authenticator:string,username:string,emailverified:number,existingmail:string,department:string):Observable<any>
  {
        // console.log(email,organization,role,lstatus,authenticator,username,emailverified,existingmail)
    const body_update={email,organization,role,lstatus,authenticator,username,emailverified,existingmail,department}
    return this.httpClient.put(this.apiURL+'adminregister_login_update',body_update);
  }


  deleteRoleData(organization: string, role: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.delete(`${this.apiURL}Role_Data_Delete`, { headers, body: { organization, role } });
  }


  
  deleteDepartmentData(organization: string, department: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.delete(`${this.apiURL}Department_Data_Delete`, { headers, body: { organization, department } });
  }
  

  // auto mail inspector to client

  getinfdata_forMail(id:string):Observable<any>{
    const url = `${this.apiURL}getinfdata_forMail`;
    const params = new HttpParams().set('id', id);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = {
      headers: headers,
      params: params
    };

    return this.httpClient.get(url, options);
  }
  getInspectorData(inspectors:any):Observable<any>{
    
    const url = `${this.apiURL}getInspectordata_forMail`;
    const params = new HttpParams().set('inspectors', inspectors);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = {
      headers: headers,
      params: params
    };
    return this.httpClient.get(url, options);

  }
  getMail_Setup(organization:string):Observable<any>{
    // console.log("api called",organization)
    const url = `${this.apiURL}getMailSetupdata_forMail`;
    const params = new HttpParams().set('organization', organization);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = {
      headers: headers,
      params: params
    };
    return this.httpClient.get(url, options);

  }




  
send_mail_to_client(
  id:string,
  customername: any,
  totalunit: any,
  projectname: any,
  location: any,
  contract_number:any,
  customer_workorder_name:any,
  from: any,
  to: any,
  noOfDays: any,
  inspectionType: any,
  inspectionTime: any,
  customerMail: any,
  emailIds_CC:any,
  inspectorData: any,
  appPassword: any,
  senderEmail: any,
  inspectors: any
): Observable<any> {
  // console.log("CV post api called Send mail", customername, totalunit, projectname, location, from, to, noOfDays, inspectionType, inspectionTime, customerMail, inspectorData, appPassword, senderEmail, inspectors);

  const url = `${this.apiURL}sendmailtocli`;

  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  const body = {
    id,
    customername,
    totalunit,
    projectname,
    location,
    contract_number,
    customer_workorder_name,
    from,
    to,
    noOfDays,
    inspectionType,
    inspectionTime,
    customerMail,
    emailIds_CC,
    inspectorData,
    appPassword,
    senderEmail,
    inspectors
  };

  const options = {
    headers: headers,
    params: new HttpParams() // If you still need to include parameters in the URL, use HttpParams here
  };

  return this.httpClient.post(url, body, options);
}


// This is for client aporoval status
Cilent_approval(id:string):Observable<any>{
  console.log("api called...")
 const body={id};
   return this.httpClient.post(this.apiURL+'Client_approval',body);
}
submitRejection(data:string,id:string):Observable<any>{
  console.log("api called...")
 const body={data,id};
   return this.httpClient.post(this.apiURL+'submitRejection',body);
}


Check_Client_response(id:string):Observable<any>
{
  console.log("api called...")
 const body={id};
  return this.httpClient.post(this.apiURL+'Check_Client_response',body);
}
// set_send_Mail_status

set_send_Mail_status(id:string):Observable<any>
{
  console.log("api called&&&&&&",id)
 const body={id};
   return this.httpClient.post(this.apiURL+'setMailstatus',body);
}
get_Rejection_schedule():Observable<any>
{
  return this.httpClient.get(this.apiURL+'get_Rejection_schedule')
}

get_master_checklist():Observable<any>
{
  console.log("apicallservice")
  return this.httpClient.get(this.apiURL+'get_checklistmaster')
}

getpitContent(product:string):Observable<any>{
  console.log("Api called-->",product)
  const url = `${this.apiURL}getpitContent`;
  const params = new HttpParams().set('product', product);

  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  const options = {
    headers: headers,
    params: params
  };
  return this.httpClient.get(url,options) ;
}


get_insp_master_checklist(Description:string):Observable<any>{
  console.log("Api called-->",Description)
  const url = `${this.apiURL}get_insp_master_checklist_description`;
  const params = new HttpParams().set('Description', Description);

  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  const options = {
    headers: headers,
    params: params
  };
  return this.httpClient.get(url,options) ;
}


// 
insert_Record_Values(documentId: string, inspectorName: string,section:string, unitNo: string, title: string, valueArray: string[], checkpoint: boolean[], capturedImages: any[], NeedforReport: boolean[]):Observable<any> {
  const body={documentId, inspectorName,section, unitNo, title, valueArray, checkpoint, capturedImages, NeedforReport};  
 console.log("api called ")
  return this.httpClient.post(this.apiURL+'insert_Record_Values',body);
}
// Check_check_data_exists
Check_check_data_exists(Doc:any,unit:any,section:any,insp_name:any,String_array:string[]):Observable<any>
{
const body_data={Doc,unit,section,insp_name,String_array}
  return this.http.post(this.apiURL+"Check_check_data_exists",body_data)
}


syncValue(value: any): Observable<any> {
  console.log("Api called")
  return this.http.post(this.apiURL+'syncOff', value);
}
































  getLoginData():Observable<any>{
    

 return this.httpClient.get(this.apiURL+'loginData');
  }


  // This is check email exists or not
  checkUserEmailExists(email:string):Observable<any>{
    console.log("Api called")
    const url = `${this.apiURL}Email_exists`;
    const params = new HttpParams().set('Email', email);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = {
      headers: headers,
      params: params
    };
    return this.httpClient.get(url,options) ;
  }

  // send_reset_link_To_user_mail (Forgot)
  send_reset_link(email:string):Observable<any>{
    console.log("sent mail Api called")
    const url = `${this.apiURL}sent_Password_reset_link`;
    const params = new HttpParams().set('Email', email);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = {
      headers: headers,
      params: params
    };
    return this.httpClient.get(url,options) ;
  }
  // reset_Password
  reset_Password(token:string,Email:string,Password:string):Observable<any>
  {
    console.log("reset password api called ",Password,token,Email)
    const body={Password,token,Email};
      return this.httpClient.post(this.apiURL+'Reset_Password',body);
  }






  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    console.log("**** API Called")
    return this.httpClient.post(this.apiURL+'login', body);
  }

  adminregister(userid:string, password:string, organization:string, role:String,status:number,authenticator:string,name:string,statusnum:number,department:string):Observable<any>{
    const body={userid,password,organization,role,status,authenticator,name,statusnum,department};
    return this.httpClient.post(this.apiURL+'adminregister',body);

  }

  // getrole(username: string): Observable<any> {
  //   const body = { username };
  //   return this.httpClient.post(this.apiURL+'getrole', body);
  // }

 addData(data:any):Observable<any>
 {
  return this.httpClient.post(this.apiURL+'addRoleData',data);
 }

// this is for XL file upload to Database for Inspection checkList master
uploadFile(formData: FormData): Observable<any> {
  console.log("apicalled")
  return this.http.post<any>(this.apiURL + 'upload', formData);
}





 getRoleDepartmentData(organization:string):Observable<any>
 {
  const url = `${this.apiURL}getRoleData`;
    const params = new HttpParams().set('organization', organization);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = {
      headers: headers,
      params: params
    };

    return this.httpClient.get(url, options);
  }






  InsertDepartmentData(Department:string,Organization:string):Observable<any>
  {

    const body={Department,Organization};


    return this.httpClient.post(this.apiURL+"InsertDepartmentData",body) ;
  }
  InsertRoleData(Role:string,Organization:string):Observable<any>
  {

    const body={Role,Organization};


    return this.httpClient.post(this.apiURL+"InsertRoleData",body) ;
  }



  // INF

  selectedDetails:string[] | any=[];

  inspector_names:string[]=[];
  

  private contract_no = 'http://localhost:3000/contract_no';

  private contract_no1 = 'http://localhost:3000/contract_no1';

  private leave = 'http://localhost:3000/api/leaveData';



  // constructor(private http:HttpClient) { }

  //to display contract number 
  getContractNo(): Observable<string[]> {
    return this.http.get<string[]>(this.contract_no);
  }

  getContractNo1(): Observable<string[]> {
    return this.http.get<string[]>(this.contract_no1);
  }

  getDetailsForContractName(c_no: string|null): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/details/${c_no}`);
  }

  leaveData():Observable<any>{
    return this.http.get(this.leave);
  }


  total_count:number=0;
  hydra_elevator:number=0;
  dumb_waiter:number=0;
  car_parking:number=0;
  escalator:number=0;
  moving_walk:number=0;
  travelator:number=0;

  inspector_list:string[]=[];

  //elevator
  elevator_names:string[]=[]; //1
  elevator_usage:string[]=[];
  elevator_type:string[]=[];
  elevator_stops:number[]=[];
  elevator_stops_count:number=0;

  calculateSum(): number {
    return this.elevator_stops.reduce((acc, currentValue) => acc + currentValue, 0);
  }

  no_of_units:number=0;
  

  //home elevator
  home_names:string[]=[]; //2
  home_usage:string[]=[];
  home_type:string[]=[];
  home_stops:number[]=[];
  

  calculateSum1(): number {
    return this.home_stops.reduce((acc, currentValue) => acc + currentValue, 0);
  }


  //dump waiter
  dump_names:string[]=[]; //3
  dump_usage:string[]=[];
  dump_type:string[]=[];
  dump_stops:number[]=[];

  // all_items=[...this.elevator_names,...this.home_names,...this.dump_names];

  calculateSum2(): number {
    return this.dump_stops.reduce((acc, currentValue) => acc + currentValue, 0);
  }

  //car parking
  car_parking_values:string[]=[];


  //escalator
  escalator_values:string[]=[];


  //moving_walk
  moving_walk_values:string[]=[];

  //unit_details
  unit_values:string[]=[];

  //unit count
  recordCount:number=0;


  //travelator
  travelator_values:string[]=[];


  //filtered inspectors 



  //total_checked_items
  total_checked_items:string[]=[];
  
  checkedCount:number=0;

  //unchecked counts 

  total_unchecked_items:string[]=[];
  unCheckedCount:number=0;


  //total items
  total_items:string[]=[];
  
  // Method to set the checkedCount in the DataService
  setCheckedCount(count: number) {
    this.checkedCount = count;
  }

  // Method to get the checkedCount from the DataService
  getCheckedCount() {
    return this.checkedCount;
  }
  inspector_array: { name: string; headChecked: boolean; fromDate: Date; toDate: Date;  i_approved:number;i_rejected:number;units: number}[] = [];

  insp_check_list_ADD(description: string, dropdown: string, parts: string, photo: string, product: string, reference: string):Observable<any> {
    const requestBody = {
      description,
      dropdown,
     parts,
      photo,
      product,
     reference
    };

    // Replace 'your-endpoint' with the actual endpoint you want to call
    console.log("api called",description,
      dropdown,
     parts,
      photo,
      product,
     reference)
    
    // Assuming you're making a POST request
    // return this.http.post<any>(${this.apiURL}${}, requestBody);
    return this.httpClient.post(this.apiURL+'insp_check_list_ADD',requestBody);
  }



  insp_check_list_update(description: string, dropdown: string, parts: string, photo: string, product: string, reference: string):Observable<any>{
  const requestBody = {
    description,dropdown,parts,photo,product,reference
  };
  // Replace 'your-endpoint' with the actual endpoint you want to call
  console.log("api called successfully",description,
  dropdown,
 parts,
  photo,
  product,
 reference)

return this.httpClient.put(this.apiURL + 'insp_check_list_update', requestBody);
}
  
deleteItem1(id: number): Observable<any> {
  console.log("api delete called")
  const url = `${this.apiURL}/inspection_delete/${id}`;
  return this.http.delete(url);
}  

}