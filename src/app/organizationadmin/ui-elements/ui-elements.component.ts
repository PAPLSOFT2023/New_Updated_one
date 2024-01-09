import { Component, ElementRef, ViewChild,Renderer2,AfterViewInit} from '@angular/core';
import { ApicallService } from 'src/app/apicall.service';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
@Component({
  selector: 'app-ui-elements',
  templateUrl: './ui-elements.component.html',
  styleUrls: ['./ui-elements.component.scss']
})
export class UiElementsComponent  {

  constructor(private http: HttpClient, private apicallservice: ApicallService) {}

  


  // this is profile data 
  organization_name: string = '';
  address: string = '';
  pincode: string = '';
  state: string = '';
  country: string = '';
  contact: string = ''; // end of profile data
  

  selectedData: string = ''; // selected Department Data
  NewRole_Data:string='';// getting new role
  isDataEntryVisible: boolean = false;


  departments: string[] = [];
  roles: string[] = [];
  organizations: string[] = [];



  Dump_Usage:string[]=[];
  Dump_Usage_INSERT:string='';
  
  Dump_Type:string[]=[];
  Dump_Type_INSERT:string='';

  Home_Type:string[]=[];
  Home_Type_INSERT:string='';

  Home_Usage:string[]=[];
  Home_Usage_INSERT:string='';

  Ins_Time:string[]=[];
  Ins_Time_INSERT:string='';

  Ins_Time_Insp:string[]=[];
  Ins_time_Insp_INSERT:string='';

  OEM_Details:string[]=[];
  OEM_Details_INSERT:string='';

  Region_Details:string[]=[];
  Region_Details_INSERT:string='';

  Type_Bul_Details:string[]=[]
  Type_Bul_Details_INSERT:string='';

  Travel_Acc_Details:string[]=[];
  Travel_Acc_Details_INSERT:string='';
  Type_ele_Details:string[]=[];
  Type_ele_Details_INSERT:string='';

  departmenttext:string=''
  newRollData: string = '';
  RolldataItems: string[] = [];
  newDepartmentData: string = '';
  DepartmentdataItems: string[] = [];
   uniqueRolls = new Set<string>();
   uniqueDepartments = new Set<string>();


  tooltipText: string = ''
  organizationRoles !:any[];
  // Properties for controlling the popup forms
  isPopupVisible1: boolean = false;
  isPopupVisible2: boolean = false;
  isPopupVisible_dumptype:boolean=false;
  isPopupVisible_dumpusage:boolean=false;
  isPopupVisible_hometype:boolean=false;
  isPopupVisible_homeusage:boolean=false;
  isPopupVisible_ins_time:boolean=false;
  isPopupVisible_ins_time_insp:boolean=false;
  isPopupVisible_OEM:boolean=false;
  isPopupVisible_Region:boolean=false;
  isPopupVisible_Travel_Acc:boolean=false;
  isPopupVisible_Type_Ele:boolean=false;
  isPopupVisible_Type_Bul:boolean=false;
  ispopupvisible_insp_cv : boolean = false;



  isPopupVisible3: boolean = false;
  isPopupVisible4: boolean = false;
  field1: string = '';
  field2: string = '';
  field3: string = '';
  field4: string = '';
  // Add the following property to your UiElementsComponent class
inspectorCvData: any = {
  pdf: null, // You might want to initialize this based on your data structure
};

// Uncomment the following line in your onFileChange method
onFileChange(event: any) {
  this.inspectorCvData.pdf = event.target.files[0];
}


  // Reference to the popup form element in the template
  @ViewChild('popupForm') popupForm!: ElementRef;


  ngOnInit() {
    this.apicallservice.getInspectorCv().subscribe(
      (data:any) => {
        this.inspectorCvData = data;
      },
      (error:any) => {
        console.error('Error fetching inspectorCv data:', error);
      }
    );
    // Other initialization code if needed
  }

  onEmailChange() {
    this.tooltipText = "";
  }
  uploadInspectorCv(){

  }

  // Method to open the data entry form
  openDataEntry(): void {
    this.isDataEntryVisible = !this.isDataEntryVisible;
  }
  addToDropdownRole(roledata:string): void {

    if(roledata !=null)
    {
      const organization = sessionStorage.getItem("Organization") as string;
      this.apicallservice.InsertRoleData(roledata, organization).subscribe((response:any)=>{
      
        alert(response.message)  
        this.departments.push(this.departmenttext)
    },(error:any)=>{
      if(error.status==400)
      { 
        alert("This data already exists")
      }
      else{
        alert(error.message)
      }
      
      
      
    });

      


    }
  }
  // Method to add data to the dropdown and database
  addToDropdownDepartment(): void {

    if(this.departmenttext !=null)
    {
     
      this.apicallservice.InsertDepartmentData(this.departmenttext,sessionStorage.getItem("Organization") as string).subscribe((response:any)=>{
      
          alert(response.message)  
          this.departments.push(this.departmenttext)

           
          
        
      },(error:any)=>{
        if(error.status==400)
        {
          alert("This data already exists")
        }
        else{
          alert(error.message)
        }
        
        
        
      });


      


    }
  }

// delete Role Data
  deleteData2(): void {
    // console.log("rnjfnjnfwkjewjr",this.selectedData)
    if (this.selectedData) {

      this.apicallservice.deleteRoleData(sessionStorage.getItem("Organization") as string,this.selectedData).subscribe((response)=>{

        if(response)
        {
          alert(response.message)
          this.roles = this.roles.filter(role => role !== this.selectedData);
          this.selectedData = '';
           
        }
      },(error)=>{
        alert(error.message)
      });

     
      
    }
    else{
      alert("Select the Role Before Delete")
    }
  }

  // Method to delete Department data
  deleteData1(): void {
    // console.log("rnjfnjnfwkjewjr",this.selectedData)
    if (this.selectedData) {

      this.apicallservice.deleteDepartmentData(sessionStorage.getItem("Organization") as string,this.selectedData).subscribe((response)=>{

        if(response)
        {
          alert(response.message)
          this.departments = this.departments.filter(department => department !== this.selectedData);
            this.selectedData = '';
        }
      },(error)=>{
        alert(error.message)
      });

     
      
    }
    else{
      alert("Select the Department Before Delete")
    }
  }

  // Method to save data
  saveData(): void {
    if (this.newRollData.trim() !== '') {
      this.RolldataItems.push(this.newRollData);
      this.newRollData = ''; // Clear the input field
      this.isDataEntryVisible = false;
    }
  }

  // Method to cancel data entry
  cancelData(): void {
    this.newRollData = '';
    this.isPopupVisible1 = false;
    this.isPopupVisible2 = false;
    this.isPopupVisible3 = false;
    this.isPopupVisible4 = false;
    this.isPopupVisible_dumptype=false;
    this.isPopupVisible_dumpusage=false;
    this.isPopupVisible_hometype=false;
    this.isPopupVisible_homeusage=false;
    this.isPopupVisible_ins_time=false;
    this.isPopupVisible_ins_time_insp=false;
    this.isPopupVisible_OEM=false;
    this.isPopupVisible_Region=false;
    this.isPopupVisible_Travel_Acc=false;
    this.isPopupVisible_Type_Ele=false;
    this.isPopupVisible_Type_Bul=false;
    this.ispopupvisible_insp_cv = false;

    

  }

  // Method to get Roll and department data

  getRolebasedData() {
    this.apicallservice.getRoleDepartmentData(sessionStorage.getItem('Organization') as string).subscribe(
      (response: any) => {
        if (response) {
          // Assuming response has properties Department, Role, and Organization
          this.departments = Array.from(new Set(response.Department));
          this.roles = Array.from(new Set(response.Role));
          this.organizations = Array.from(new Set(response.Organization));
          // console.log("::::::",this.roles)
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  
  onSubmit(): void {
    const formData = {
      organization_name: this.organization_name,
      address: this.address,
      pincode: this.pincode,
      state: this.state,
      country: this.country,
      contact: this.contact
    };


if(formData.organization_name && this.address && this.pincode && this.state && this.country  && this.contact){
    this.apicallservice.profileInsert(formData.organization_name,this.address,this.pincode,this.state,this.country,this.contact,sessionStorage.getItem("Organization") as string).subscribe(
      (response: any) => {

      
          

        if(response){
          alert("Profile is uploaded.")
        }
       
        // Clear the form or perform other actions after successful submission
        
      },
      (error: any) => {
        console.error('Error submitting form data:', error);
        // Handle errors here
      }
    );
}
else{
  alert("Please enter all Values")
}


  }

  cancelData1(): void {
     this.organization_name = '';
      this.address = '';
     this.pincode = '';
      this.state= '';
      this.country = '';
       this.contact = '';
       this.isPopupVisible1 = false;
  }


// Get Dump usage Data

  getDumpUsageData(){
    this.apicallservice.getDump_usageData().subscribe(
      (response: any[]) => {
        if (response) {
          this.Dump_Usage = response.map((item: any) => item.usage_dumb);
          console.log("Dump", this.Dump_Usage);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

// Insert Dump Usage
add_Dump_Usage(){
  if(this.Dump_Usage_INSERT !=null)
  {
    this.apicallservice.addDump_Usage(this.Dump_Usage_INSERT).subscribe((response:any)=>{
      
      alert(response.message)  
      this.Dump_Usage.push(this.Dump_Usage_INSERT)

       
      
    
  },(error:any)=>{
    if(error.status==400)
    {
      alert("Bad Request")
    }
    else{
      alert(error.message)
    }
    
    
    
  });
  }
}
// Delete Dump Usge
delete_Dump_Usage_Data1(): void {

  if (this.selectedData) {

    this.apicallservice.delete_Dump_Usage_Data(this.selectedData).subscribe((response)=>{

      if(response)
      {
        alert(response.message)
        this.Dump_Usage = this.Dump_Usage.filter(dumpusage => dumpusage !== this.selectedData);
          this.selectedData = '';
      }
    },(error)=>{
      alert(error.message)
    });

   
    
  }
  else{
    alert("Select the Dumb Usage Before Delete")
  }
}



// GET Dump Type data frm DB
get_Dump_type_Data(){
  this.apicallservice.getDump_TypeData().subscribe(
    (response: any[]) => {
      if (response) {
        this.Dump_Type = response.map((item: any) => item.type_dumb);
        console.log("Dump", this.Dump_Type);

      }
    },
    (error: any) => {
      console.log(error);
    }
  );
}
// add Dump Type to DB
addToDropdownDump_Type(){
  if(this.Dump_Usage_INSERT !=null)
  {
    this.apicallservice.addDump_Type(this.Dump_Type_INSERT).subscribe((response:any)=>{
      
      alert(response.message)  
      this.Dump_Type.push(this.Dump_Type_INSERT)

       
      
    
  },(error:any)=>{
    if(error.status==400)
    {
      alert("Bad request")
    }
    else{
      alert(error.message)
    }
    
    
    
  });
  }
}
// delete Dumb type 
delete_Dump_Type_Data1(): void {

  if (this.selectedData) {

    this.apicallservice.delete_Dump_Type_Data(this.selectedData).subscribe((response)=>{

      if(response)
      {
        alert(response.message)
        this.Dump_Type = this.Dump_Type.filter(dumpusage => dumpusage !== this.selectedData);
          this.selectedData = '';
      }
    },(error)=>{
      alert(error.message)
    });

   
    
  }
  else{
    alert("Select the Dumb Type Before Delete")
  }
}

//  get_Home_type_Data
get_Home_type_Data(){
  this.apicallservice.getHome_TypeData().subscribe(
    (response: any[]) => {
      if (response) {
        this.Home_Type = response.map((item: any) => item.home_type);
        console.log("Dump", this.Home_Type);

      }
    },
    (error: any) => {
      console.log(error);
    }
  );
}
// addToDropdownHome_Type
addToDropdownHome_Type(){
  if(this.Home_Type_INSERT !=null)
  {
    this.apicallservice.addHome_Type(this.Home_Type_INSERT).subscribe((response:any)=>{
      
      alert(response.message)  
      this.Home_Type.push(this.Home_Type_INSERT)

       
      
    
  },(error:any)=>{
    if(error.status==400)
    {
      alert("Bad request")
    }
    else{
      alert(error.message)
    }
    
  });
  }
}

// delete home type 
delete_Home_Type_Data1(): void {

  if (this.selectedData) {

    this.apicallservice.delete_Home_Type_Data(this.selectedData).subscribe((response)=>{

      if(response)
      {
        alert(response.message)
        this.Home_Type = this.Home_Type.filter(homeusage => homeusage !== this.selectedData);
          this.selectedData = '';
      }
    },(error)=>{
      alert(error.message)
    });

   
    
  }
  else{
    alert("Select the Home Type Before Delete")
  }
}

// get_Home_Usage_Data

get_Home_Usage_Data(){
  this.apicallservice.getHome_UsageData().subscribe(
    (response: any[]) => {
      if (response) {
        this.Home_Usage = response.map((item: any) => item.home_usage);
        console.log("Dump", this.Home_Usage);

      }
    },
    (error: any) => {
      console.log(error);
    }
  );
}
// addToDropdownHome_Usage
addToDropdownHome_Usage(){
  if(this.Home_Usage_INSERT !=null)
  {
    this.apicallservice.addHome_usage(this.Home_Usage_INSERT).subscribe((response:any)=>{
      
      alert(response.message)  
      this.Home_Usage.push(this.Home_Usage_INSERT)

       
      
    
  },(error:any)=>{
    if(error.status==400)
    {
      alert("Bad request")
    }
    else{
      alert(error.message)
    }
    
  });
  }
}

// delete_Home_Usage_Data1

delete_Home_Usage_Data1(): void {

  if (this.selectedData) {

    this.apicallservice.delete_Home_Usage_Data(this.selectedData).subscribe((response)=>{

      if(response)
      {
        alert(response.message)
        this.Home_Type = this.Home_Type.filter(homeusage => homeusage !== this.selectedData);
          this.selectedData = '';
      }
    },(error)=>{
      alert(error.message)
    });

   
    
  }
  else{
    alert("Select the Home Type Before Delete")
  }
}

// get_Ins_Time_Data

get_Ins_Time_Data(){
  this.apicallservice.get_Ins_Time_Data().subscribe(
    (response: any[]) => {
      if (response) {
        this.Ins_Time = response.map((item: any) => item.time_shift);
        console.log("Dump", this.Ins_Time);

      }
    },
    (error: any) => {
      console.log(error);
    }
  );
}

// addToDropdownIns_time

addToDropdownIns_time(){
  if(this.Ins_Time_INSERT !=null)
  {
    this.apicallservice.addIns_time(this.Ins_Time_INSERT).subscribe((response:any)=>{
      
      alert(response.message)  
      this.Ins_Time.push(this.Ins_Time_INSERT)

       
      
    
  },(error:any)=>{
    if(error.status==400)
    {
      alert("Bad request")
    }
    else{
      alert(error.message)
    }
    
  });
  }
}


// delete_Ins_time_Data1

delete_Ins_time_Data1(): void {

  if (this.selectedData) {

    this.apicallservice.delete_Ins_time_Data1(this.selectedData).subscribe((response)=>{

      if(response)
      {
        alert(response.message)
        this.Ins_Time = this.Ins_Time.filter(homeusage => homeusage !== this.selectedData);
          this.selectedData = '';
      }
    },(error)=>{
      alert(error.message)
    });

   
    
  }
  else{
    alert("Select the Time  Before Delete")
  }
}
// get_Ins_Time_Insp_Data

get_Ins_Time_Insp_Data(){
  this.apicallservice.get_Ins_Time_Insp_Data().subscribe(
    (response: any[]) => {
      if (response) {
        this.Ins_Time_Insp = response.map((item: any) => item.inspection_time);
        console.log("Dump", this.Ins_Time);

      }
    },
    (error: any) => {
      console.log(error);
    }
  );
}
// addToDropdownIns_time_insp

addToDropdownIns_time_insp(){
  if(this.Ins_time_Insp_INSERT !=null)
  {
    this.apicallservice.addIns_time_insp(this.Ins_time_Insp_INSERT).subscribe((response:any)=>{
      
      alert(response.message)  
      this.Ins_Time_Insp.push(this.Ins_time_Insp_INSERT)

       
      
    
  },(error:any)=>{
    if(error.status==400)
    {
      alert("Bad request")
    }
    else{
      alert(error.message)
    }
    
  });
  }
}
// delete_Ins_time_insp_Data1



delete_Ins_time_insp_Data1  (): void {

  if (this.selectedData) {

    this.apicallservice.delete_Ins_time_insp_Data1(this.selectedData).subscribe((response)=>{

      if(response)
      {
        alert(response.message)
        this.Ins_Time_Insp = this.Ins_Time_Insp.filter(homeusage => homeusage !== this.selectedData);
          this.selectedData = '';
      }
    },(error)=>{
      alert(error.message)
    });

   
    
  }
  else{
    alert("Select the Time  Before Delete")
  }
}
// get_OEM_Data
get_OEM_Data(){
  this.apicallservice.get_OEM_Data().subscribe(
    (response: any[]) => {
      if (response) {
        this.OEM_Details = response.map((item: any) => item.oem_name);
        console.log("Dump", this.OEM_Details);

      }
    },
    (error: any) => {
      console.log(error);
    }
  );
}
// addToOEM_Details

addToOEM_Details(){
  if(this.Ins_time_Insp_INSERT !=null)
  {
    this.apicallservice.addToOEM_Details(this.OEM_Details_INSERT).subscribe((response:any)=>{
      
      alert(response.message)  
      this.OEM_Details.push(this.OEM_Details_INSERT)

       
      
    
  },(error:any)=>{
    if(error.status==400)
    {
      alert("Bad request")
    }
    else{
      alert(error.message)
    }
    
  });
  }
}
// delete_OEM_Data1


delete_OEM_Data1  (): void {

  if (this.selectedData) {

    this.apicallservice.delete_OEM_Data1(this.selectedData).subscribe((response)=>{

      if(response)
      {
        alert(response.message)
        this.OEM_Details = this.OEM_Details.filter(homeusage => homeusage !== this.selectedData);
          this.selectedData = '';
      }
    },(error)=>{
      alert(error.message)
    });

   
    
  }
  else{
    alert("Select the Time  Before Delete")
  }
}
// get_Region_Details
get_Region_Details(){
  this.apicallservice.get_Region_Details().subscribe(
    (response: any[]) => {
      if (response) {
        this.Region_Details = response.map((item: any) => item.region_name);
        console.log("Dump", this.Region_Details);

      }
    },
    (error: any) => {
      console.log(error);
    }
  );
}
// addToRegion_Details
addToRegion_Details(){
  if(this.Region_Details_INSERT !=null)
  {
    this.apicallservice.addToRegion_Details(this.Region_Details_INSERT).subscribe((response:any)=>{
      
      alert(response.message)  
      this.Region_Details.push(this.Region_Details_INSERT)

       
      
    
  },(error:any)=>{
    if(error.status==400)
    {
      alert("Bad request")
    }
    else{
      alert(error.message)
    }
    
  });
  }
}

// delete_Region_Data1


delete_Region_Data1  (): void {

  if (this.selectedData) {

    this.apicallservice.delete_Region_Data1(this.selectedData).subscribe((response)=>{

      if(response)
      {
        alert(response.message)
        this.Region_Details = this.Region_Details.filter(homeusage => homeusage !== this.selectedData);
          this.selectedData = '';
      }
    },(error)=>{
      alert(error.message)
    });

   
    
  }
  else{
    alert("Select the Time  Before Delete")
  }
}

// get_Travel_Acc_Details

get_Travel_Acc_Details(){
  this.apicallservice.get_Travel_Acc_Details().subscribe(
    (response: any[]) => {
      if (response) {
        this.Travel_Acc_Details = response.map((item: any) => item.type_of);
        console.log("Dump", this.Travel_Acc_Details);

      }
    },
    (error: any) => {
      console.log(error);
    }
  );
}

// addToTravel_Acc_Details


addToTravel_Acc_Details(){
  if(this.Travel_Acc_Details_INSERT !=null)
  {
    this.apicallservice.addToTravel_Acc_Details(this.Travel_Acc_Details_INSERT).subscribe((response:any)=>{
      
      alert(response.message)  
      this.Travel_Acc_Details.push(this.Travel_Acc_Details_INSERT)

  },(error:any)=>{
    if(error.status==400)
    {
      alert("Bad request")
    }
    else{
      alert(error.message)
    }
    
  });
  }
}

// delete_Travel_Acc_Data1



delete_Travel_Acc_Data1  (): void {

  if (this.selectedData) {

    this.apicallservice.delete_Travel_Acc_Data1(this.selectedData).subscribe((response)=>{

      if(response)
      {
        alert(response.message)
        this.Travel_Acc_Details = this.Travel_Acc_Details.filter(homeusage => homeusage !== this.selectedData);
          this.selectedData = '';
      }
    },(error)=>{
      alert(error.message)
    });

   
    
  }
  else{
    alert("Select the Time  Before Delete")
  }
}


// get_Type_Ele_Details
get_Type_Ele_Details(){
  this.apicallservice.get_Type_Ele_Details().subscribe(
    (response: any[]) => {
      if (response) {
        this.Type_ele_Details = response.map((item: any) => item.type);
        console.log("Dump", this.Type_ele_Details);

      }
    },
    (error: any) => {
      console.log(error);
    }
  );
}
// addToType_EleDetails


addToType_EleDetails(){
  if(this.Type_ele_Details_INSERT !=null)
  {
    this.apicallservice.addToType_EleDetails(this.Type_ele_Details_INSERT).subscribe((response:any)=>{
      
      alert(response.message)  
      this.Type_ele_Details.push(this.Type_ele_Details_INSERT)

  },(error:any)=>{
    if(error.status==400)
    {
      alert("Bad request")
    }
    else{
      alert(error.message)
    }
    
  });
  }
}
// delete_Type_ele_Data1


delete_Type_ele_Data1  (): void {

  if (this.selectedData) {

    this.apicallservice.delete_Type_ele_Data1(this.selectedData).subscribe((response)=>{

      if(response)
      {
        alert(response.message)
        this.Type_ele_Details = this.Type_ele_Details.filter(homeusage => homeusage !== this.selectedData);
          this.selectedData = '';
      }
    },(error)=>{
      alert(error.message)
    });

   
    
  }
  else{
    alert("Select the Time  Before Delete")
  }
}
// get_Type_Bul_Details


get_Type_Bul_Details(){
  this.apicallservice.get_Type_Bul_Details().subscribe(
    (response: any[]) => {
      if (response) {
        this.Type_Bul_Details = response.map((item: any) => item.building_name);
        console.log("Dump", this.Type_Bul_Details);

      }
    },
    (error: any) => {
      console.log(error);
    }
  );
}
// addToType_BulDetails

addToType_BulDetails(){
  if(this.Type_Bul_Details_INSERT !=null)
  {
    this.apicallservice.addToType_BulDetails(this.Type_Bul_Details_INSERT).subscribe((response:any)=>{
      
      alert(response.message)  
      this.Type_Bul_Details.push(this.Type_Bul_Details_INSERT)

  },(error:any)=>{
    if(error.status==400)
    {
      alert("Bad request")
    }
    else{
      alert(error.message)
    }
    
  });
  }
}


// delete_Type_Bul_Data1


delete_Type_Bul_Data1  (): void {

  if (this.selectedData) {

    this.apicallservice.delete_Type_Bul_Data1(this.selectedData).subscribe((response)=>{

      if(response)
      {
        alert(response.message)
        this.Type_Bul_Details = this.Type_Bul_Details.filter(homeusage => homeusage !== this.selectedData);
          this.selectedData = '';
      }
    },(error)=>{
      alert(error.message)
    });

   
    
  }
  else{
    alert("Select the Time  Before Delete")
  }
}
























  // Method to close the popup form
  closePopupForm(): void {
    this.isPopupVisible1 = false;
    this.isPopupVisible2 = false;
    this.isPopupVisible3 = false;
    this.isPopupVisible4 = false;
    this.isPopupVisible_dumptype=false;
    this.isPopupVisible_dumpusage=false;
    this.isPopupVisible_hometype=false;
    this.isPopupVisible_homeusage=false;
    this.isPopupVisible_ins_time=false;
    this.isPopupVisible_ins_time_insp=false;
    this.isPopupVisible_OEM=false;
    this.isPopupVisible_Region=false;
    this.isPopupVisible_Type_Ele=false;
    this.isPopupVisible_Type_Bul=false;
    this.ispopupvisible_insp_cv = false ;
  }

  // Define the openPopupForm methods
  openPopupForm1(): void {
    this.closePopupForm();
    this.isPopupVisible1 = true;
  }
///department update
  openPopupForm2(): void {

    this.getRolebasedData();

    this.closePopupForm();
    this.isPopupVisible2 = true;
  }
// open dump usage
  openPopupFormDump_Usage(): void {

    this.getDumpUsageData();

    this.closePopupForm();
    this.isPopupVisible_dumpusage = true;
  }
// Dump type
openPopup_Dump_type(): void {

  this.get_Dump_type_Data();


  this.closePopupForm();
  this.isPopupVisible_dumptype = true;
}
// home Type
openPopupFormHome_Type(): void {

  this.get_Home_type_Data();


  this.closePopupForm();
  this.isPopupVisible_hometype = true;
}
// openPopupFormHome_Usage
openPopupFormHome_Usage(): void {

  this.get_Home_Usage_Data();


  this.closePopupForm();
  this.isPopupVisible_homeusage = true;
}


// openPopupForm_Ins_Time
openPopupForm_Ins_Time():void
{

  this.get_Ins_Time_Data();


  this.closePopupForm();
  this.isPopupVisible_ins_time = true;
}
// openPopupForm_Ins_time_insp
openPopupForm_Ins_time_insp():void
{

  this.get_Ins_Time_Insp_Data();


  this.closePopupForm();
  this.isPopupVisible_ins_time_insp= true;
}
// openPopupForm_OEM


openPopupForm_OEM():void
{

  this.get_OEM_Data();


  this.closePopupForm();
  this.isPopupVisible_OEM= true;
}

// openPopupForm_Region_Details

openPopupForm_Region_Details():void
{

  this.get_Region_Details();


  this.closePopupForm();
  this.isPopupVisible_Region= true;
}

// openPopupForm_Travel_Acc



openPopupForm_Travel_Acc():void
{

  this.get_Travel_Acc_Details();


  this.closePopupForm();
  this.isPopupVisible_Travel_Acc= true;
}

// openPopupForm_Type_Ele

openPopupForm_Type_Ele():void
{

  this.get_Type_Ele_Details();


  this.closePopupForm();
  this.isPopupVisible_Type_Ele= true;
}

// openPopupForm_Type_Bul

openPopupForm_Type_Bul():void
{

  this.get_Type_Bul_Details();


  this.closePopupForm();
  this.isPopupVisible_Type_Bul= true;
}

// openPopupForm_Type_Bul

openPopupForm_insp():void
{


  this.closePopupForm();
  this.ispopupvisible_insp_cv= true;
}













//role update
  openPopupForm3(): void {


    this.getRolebasedData();
    this.closePopupForm();
    this.isPopupVisible3 = true;
  }
//mail automation 
  openPopupForm4(): void {

    
    this.closePopupForm();
    this.isPopupVisible4 = true;
  }
  
    togglePopupVisibility() {
      this.ispopupvisible_insp_cv = !this.ispopupvisible_insp_cv;
    }
  }
