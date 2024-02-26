import { Component, ElementRef, ViewChild,Renderer2,AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

import { ApicallService } from 'src/app/apicall.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { response } from 'express';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-ui-elements',
  templateUrl: './ui-elements.component.html',
  styleUrls: ['./ui-elements.component.scss']
})
export class UiElementsComponent  {


//   submitEditForm() {
//     this.closeEntry();


// }
  
  constructor(private http: HttpClient, private apicallservice: ApicallService, private router: Router,private formBuilder: FormBuilder) {

    this.entryForm = this.formBuilder.group({
      product: ['', Validators.required],
      parts: ['', Validators.required],
      description: ['', Validators.required],
      reference: ['', Validators.required],
      photo: ['', Validators.required],
      dropdown: ['', Validators.required]});
  }
  
  items:any[] = [];
  entryForm: FormGroup = new FormGroup({
    product: new FormControl('', Validators.required),
    parts: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    reference: new FormControl('', Validators.required),
    photo: new FormControl('', Validators.required),
    dropdown: new FormControl('', Validators.required),
  });


  ngOnInit() {
    
  }
 
  


  // this is profile data 
  editForm: boolean = false; // Assume this flag controls the visibility of the edit form
  editEntryForm: FormGroup = new FormGroup({
    product: new FormControl('', Validators.required),
    parts: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    reference: new FormControl('', Validators.required),
    photo: new FormControl('', Validators.required),
    dropdown: new FormControl('', Validators.required),
    // Add other form controls as needed
  }); 


  formData: any = {};
  isEdit: boolean = false;
  organization_name: string = '';
  address: string = '';
  pincode: string = '';
  state: string = '';
  country: string = '';
  contact: string = ''; // end of profile data
  isUploadPopupVisible: boolean = false;
  
  isUploading: boolean = false; // Add this line
  fileName: string = ''; // Add this line

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
   psnNumbers: string[] = [];
   selectedFile: File | null = null;

  
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
  cv_view_Popup:boolean=false;
  flag_manual_Entry:boolean=false;
  addForm:boolean=false;



  isPopupVisible3: boolean = false;
  isPopupVisible4: boolean = false;
  isPopupVisible5: boolean = false;
  isPopupVisible6: boolean = false;
  isPopupVisible7: boolean = false;

  field1: string = '';
  field2: string = '';
  field3: string = '';
  field4: string = '';
  // Add the following property to your UiElementsComponent class
inspectorCvData: any = {
  pdf: null, // You might want to initialize this based on your data structure
};

newItem: { Product: string, Parts: string, Description: string, Reference: string, Photo: string, Dropdown: string } = {
  Product: '',
  Parts: '',
  Description: '',
  Reference: '',
  Photo: '',
  Dropdown: ''
};




  // Reference to the popup form element in the template
  @ViewChild('popupForm') popupForm!: ElementRef;


 

  onEmailChange() {
    this.tooltipText = "";
  }
getcv(){
  this.apicallservice.getInspectorCv().subscribe(
    (data:any) => {

      this.psnNumbers = data.psnNumbers;

      
    
    },
    (error:any) => {
      console.error('Error fetching inspectorCv data:', error);
    }
  );
}

onFileChange(event: any): void {
  const fileList: FileList = event.target.files;
  if (fileList.length > 0) {
    this.inspectorCvData.pdf = fileList[0];
  }
}



// Your component file
uploadInspectorCv(): void {
  this.apicallservice.uploaCV(
     this.inspectorCvData.email,
     this.inspectorCvData.pdf
 ).subscribe(
    (result: any) => {
      if (result) {
        alert(result.message);
      }
    },
    (error: any) => {
      console.error(error);
      if (error.status === 400 && error.error && error.error.error === 'PSN_NO already exists.') {
        alert('Already exists.');
      }
       else {
        alert('Already exists.');
      }
    }
  );
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
    this.isPopupVisible5 = false;
    this.isPopupVisible6 = false;
    this.isPopupVisible7 = false;
    
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
    this.cv_view_Popup=false;


    

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
    this.isPopupVisible5 = false;
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
    

    ViewCv(){
      // create pop up form call api the list of cv.pdf
      this.getcv()
      this.cv_view_Popup= !this.cv_view_Popup;

    }
    toggleDataEntryContainer() {
      this.isPopupVisible5 = !this.isPopupVisible5; // Toggle the visibility state
    }
    toggleDataEntryContainer2() {
      this.isPopupVisible6 = !this.isPopupVisible6; // Toggle the visibility state
    }
    
    toggleDataEntryContainer3() {
      this.isPopupVisible7 = !this.isPopupVisible7; // Toggle the visibility state
    }

    manualentry_click(){
     
      this.isPopupVisible5= !this.isPopupVisible5
      this.flag_manual_Entry= !this.flag_manual_Entry

      this.apicallservice.get_master_checklist().subscribe((response:any)=>{

        if(response)
        {
          this.items = response;
      console.log(this.items);
         


         
        }
      },(error:any)=>{
        alert(error.message)
      });
    }


    
  
    addItem() {
      // Call your service to add a new item
      // Example: this.yourCrudService.addItem(this.formData);
      this.resetForm();
      // this.fetchData(); // Refresh the table after adding an item
    }
  
    editItem(item: any) {
      this.formData = { ...item };
      this.isEdit = true;
    }
  
    updateItem() {
      // Call your service to update the item
      // Example: this.yourCrudService.updateItem(this.formData);
      this.resetForm();
      // this.fetchData(); // Refresh the table after updating an item
    }
    //delete crud inspection_checklist direct api call//
    deleteItem1(item: any): void {
      console.log('item id is ',item);
      const params = { params: { items: item } };      // Assuming 'deleteItem' is a method in your ApiService
      this.http.delete('http://localhost:3000/api/inspection_delete', params).subscribe(
        (response) => {
          console.log('Data delete successfully', response);
          const successMessage = 'Data Delete Success...!';
          const userConfirmation = window.confirm(successMessage);
          if(userConfirmation){
            // this.router.navigate(['afterlogin/plan_eg_home']);
          }
        },
        (error) => {
          console.error('Error storing data', error);
        }
      );
    }
  
    cancelEdit() {
      this.resetForm();
    }
  
    resetForm() {
      this.formData = {};
      this.isEdit = false;
    }

    closeEntry() {
      this.flag_manual_Entry = false;
    }
   
    OpenEntry() {
      this.addForm = !this.addForm;
    }
    editEntry(item: any) {
      // Implement your logic to enter the edit mode for the selected item
      console.log("Editing item:", item);
      // You can, for example, set a flag to indicate that the row is in edit mode
    }
    submitForm(event: Event): void {
      event.preventDefault(); // Prevent the default form submission behavior
    
      if (this.entryForm.valid) {
        // Access form values using this.entryForm.value
        const formData = this.entryForm.value;
    
        // Print the form data to the console

        console.log('Form submitted:', formData);
        this.apicallservice.insp_check_list_ADD(
          formData.description,formData.dropdown,formData.parts,formData.photo,formData.product,formData.reference
                    )
                    .subscribe((response:any)=>{
                      if(response)
                      {
                        console.log(response.message)
                        if(response.message=="Record insert successfully")
                        {
                          alert("Record insert successfull")
   
    // const newItem = {
    //   Product: formData.product,
    //   Parts: formData.parts,
    //   Description: formData.description,
    //   Reference: formData.reference,
    //   Photo:formData.photo,
    //   Dropdown:formData.dropdown,
      
    // };
                          // this.items.push(newItem)




                        }
                        else{
                          alert("Record Not insert")
                        }
                      }
                    },(error:any)=>{})
    
        // Add the logic to save the data or perform other actions
    
        // After handling submission, close the form
        this.closeEntry();
      } else {
        // Form is not valid, highlight errors or display a message
        console.log('Form is invalid. Please check the fields.');
      }
    }
    openEditForm(item:any) {
      // This function will be called when the "Edit" button is clicked
      // It toggles the value of editForm to show/hide the form
     
      this.editEntryForm.setValue({
        product: item.Product || '', // Assuming item[0] corresponds to the first form control
        parts: item.Parts  || '',   // Assuming item[1] corresponds to the second form control
        description: item.Description || '',
        reference: item.Reference || '',
        photo: item.Photo || '',
        dropdown: item.Dropdown || ''
        // Add other form controls as needed
      });
      this.editForm = !this.editForm;
    }
    submitEditForm(): void {
      if (this.editEntryForm.valid) {
        const formData = this.editEntryForm.value;
        console.log('Form submitted:', formData);
    
        // Assuming you have an identifier for the data and a method in ApiCallService to update data
        this.apicallservice.insp_check_list_update(
          formData.description, formData.dropdown, formData.parts, formData.photo, formData.product, formData.reference
        ).subscribe(
          (response: any) => {
            if (response) {
              console.log(response.message);
              if (response.message == "Record insert successfully") {
                alert("Record insert successful");
              } else {
                alert("Record Not inserted");
              }
            }
          },
          (error: any) => {
            // Handle error, you might want to log or display an error message
            console.error('Error:', error);
          }
        );
    
        this.closeEntry();
      } else {
        // Form is not valid, highlight errors or display a message
        console.log('Form is invalid. Please check the fields.');
      }
    }
  
    cancel_Edit() {
      // This function will be called when the "Cancel" button is clicked
      // It closes the form by setting `editForm` to false
      this.editForm = false;
    }

      openUploadPopup(){
      this.isUploadPopupVisible = true;

    }

    
    




    onFileChange_XL(event: any): void {
      this.selectedFile = event.target.files[0];
    }

    uploadFile(): void {
      console.log("function called")
      if (!this.selectedFile) {
        alert('No file selected');
        return;
      }
    
      const formData = new FormData();
      formData.append('file', this.selectedFile);
    
 
       
      this.apicallservice.uploadFile(formData).subscribe(
          (response: any) => {
            alert(response.message );
          },
          (error) => {
            console.error('Error uploading file:', error);
            alert('Error uploading file. Please try again. '+ JSON.stringify(error.details));
          }
        );
    }
    
  
    


    close_popform() {
      // Method to close the popup form
      this.isUploadPopupVisible = false;
    }
    }
    
  
      
    