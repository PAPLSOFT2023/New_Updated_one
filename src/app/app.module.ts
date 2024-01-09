import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UiElementsComponent } from './organizationadmin/ui-elements/ui-elements.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './organizationadmin/organization_admin_Home/dashboard.component';
import { SublevelMenuComponent } from './sidenav/sublevel-menu.component';
import { LoginComponent } from './login/login.component';
import { NeworganizationComponent } from './neworganization/neworganization.component';
import { HttpClientModule } from '@angular/common/http';
import { AfterloginComponent } from './afterlogin/afterlogin.component';
import { OrganizationUserManagementComponent } from './organizationadmin/organization-user-management/organization-user-management.component';
import { SoftwareAdminDashboardComponent } from './softwareadmin/software-admin-dashboard/software-admin-dashboard.component';


import { AppHomeComponent } from './app-home/app-home.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HomeBodyComponent } from './home-body/home-body.component';
import { SoftwareAdminUserManageComponent } from './softwareadmin/software-admin-dashboard/software-admin-user-manage/software-admin-user-manage.component';
import { LogindetailManageComponent } from './softwareadmin/software-admin-dashboard/software-admin-user-manage/logindetail-manage/logindetail-manage.component';
import { ProfiledetailManageComponent } from './softwareadmin/software-admin-dashboard/software-admin-user-manage/profiledetail-manage/profiledetail-manage.component';
import { NgxCaptchaModule } from 'ngx-captcha';




// INF 

// import { DialogComponent } from './dialog/dialog.component';
// import { Dialog2Component } from './dialog2/dialog2.component';
// import { Dialog3Component } from './dialog3/dialog3.component';
// import { Dialog4Component } from './dialog4/dialog4.component';
// import { Dialog5Component } from './dialog5/dialog5.component';
// import {MatDividerModule} from '@angular/material/divider';
// import { Dialog6Component } from './dialog6/dialog6.component';
// import { Dialog7Component } from './dialog7/dialog7.component';
// import { Dialog8Component } from './dialog8/dialog8.component';
// import { Dialog9Component } from './dialog9/dialog9.component';
// import { Form1Component } from './form1/form1.component';
// import { SalesFormComponent } from './sales-form/sales-form.component';
// import { InspectionInfComponent } from './inspection-inf/inspection-inf.component';
// import { InspectionFormComponent } from './inspection-inf/inspection-form/inspection-form.component';
// import { DialogCComponent } from './inspection-inf/dialog-c/dialog-c.component';
// import { SalesHomeComponent } from './sales-form/sales-home/sales-home.component';
// import { SalesVComponent } from './sales-form/sales-v/sales-v.component';
// import { PlanningEngHomeComponent } from './planning-eng-home/planning-eng-home.component';
// import { PlanningEngInfComponent } from './planning-eng-home/planning-eng-inf/planning-eng-inf.component';
// import { DialogPComponent } from './planning-eng-home/dialog-p/dialog-p.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {MatNativeDateModule} from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { DialogComponent } from './INF/dialog/dialog.component';
import { Dialog2Component } from './INF/dialog2/dialog2.component';
import { Dialog3Component } from './INF/dialog3/dialog3.component';
import { Dialog4Component } from './INF/dialog4/dialog4.component';
import { Dialog5Component } from './INF/dialog5/dialog5.component';
import {MatDividerModule} from '@angular/material/divider';
import { Dialog6Component } from './INF/dialog6/dialog6.component';
import { Dialog7Component } from './INF/dialog7/dialog7.component';
import { Dialog8Component } from './INF/dialog8/dialog8.component';
import { Dialog9Component } from './INF/dialog9/dialog9.component'; 
import { Form1Component } from './INF/form1/form1.component';
import { SalesFormComponent } from './INF/sales/sales-form/sales-form.component'; 
import { InspectionInfComponent } from './INF/inspection-inf/inspection-inf.component';
import { InspectionFormComponent } from './INF/inspection-inf/inspection-form/inspection-form.component';
import { DialogCComponent } from './INF/inspection-inf/dialog-c/dialog-c.component';
import { SalesHomeComponent } from './INF/sales/sales-home/sales-home.component';
import { SalesVComponent } from './INF/sales/sales-v/sales-v.component';
import { PlanningEngHomeComponent } from './INF/planning-eng-home/planning-eng-home.component';
import { PlanningEngInfComponent } from './INF/planning-eng-home/planning-eng-inf/planning-eng-inf.component';
import { DialogPComponent } from './INF/planning-eng-home/dialog-p/dialog-p.component';

import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ServicesComponent } from './services/services.component';
import { MailComponent } from './mail/mail.component';
import { CalenderComponent } from './INF/inspection-inf/calender/calender.component';
import { MultipleInspectorComponent } from './INF/inspection-inf/multiple-inspector/multiple-inspector.component';
import { InfPdfComponent } from './INF/inf-pdf/inf-pdf.component';
import { DatePipe } from '@angular/common';
import { InspectorHomeComponent } from './inspector_dashboard/inspector-home/inspector-home.component';
import { ScheduledWorkComponent } from './scheduled-work/scheduled-work.component';
import { SchedulePageComponent } from './inspector_dashboard/schedule-page/schedule-page.component';
import { ConfirmPageComponent } from './confirm-page/confirm-page.component';
import { RejectionComponent } from './inspector_dashboard/rejection/rejection.component';
import { RescheduleRequestComponent } from './INF/inspection-inf/reschedule-request/reschedule-request.component';
import { ParseJsonPipe } from './parse-json.pipe';
import { MailResponseComponent } from './mail-response/mail-response.component';
// import { RejectionComponent } from './inspector_dashboard/rejection/rejection.component';





@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    SublevelMenuComponent,
    LoginComponent,
    UiElementsComponent,
  
   
    NeworganizationComponent,
         AfterloginComponent,
         OrganizationUserManagementComponent,
         SoftwareAdminDashboardComponent,
        
         AppHomeComponent,
         HomeHeaderComponent,
         HomeBodyComponent,
       
         SoftwareAdminUserManageComponent,
         LogindetailManageComponent,
         ProfiledetailManageComponent,
             
        //  INF
        DialogComponent,
        SalesFormComponent,
        DialogPComponent,
      
        SalesHomeComponent,
        SalesVComponent,
        
       


        Dialog2Component,
        Dialog3Component,
        Dialog4Component,
        Dialog5Component,
        Dialog6Component,
        Dialog7Component,
        Dialog8Component,
        Dialog9Component,
        Form1Component,
        
        InspectionInfComponent,
        InspectionFormComponent,
        DialogCComponent,
       
        PlanningEngHomeComponent,
        PlanningEngInfComponent,
        ForgotpasswordComponent,
        ServicesComponent,
        MailComponent,
        CalenderComponent,
        MultipleInspectorComponent,
        InfPdfComponent,
        InspectorHomeComponent,
        ScheduledWorkComponent,
        SchedulePageComponent,
        ConfirmPageComponent,
        RejectionComponent,
        RescheduleRequestComponent,
        ParseJsonPipe,
        MailResponseComponent,
        // RejectionComponent,
        

        
  
  
        
      
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxCaptchaModule,
    
    
    



    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatNativeDateModule,
    NgxMatIntlTelInputComponent,
    MatMenuModule,
    MatCheckboxModule,
    MatDialogModule,
    
    MatIconModule,
    MatDividerModule,
    MatDatepickerModule,
    

  ],
  providers: [DatePipe,  { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, // Set locale to 'en-GB' for 'DD/MM/YYYY' format
  { provide: MAT_DATE_FORMATS,
     useValue: { parse: { dateInput: 'DD/MM/YYYY' }, display: { dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'LL', monthYearA11yLabel: 'MMMM YYYY' } } },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
