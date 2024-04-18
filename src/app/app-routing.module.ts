import { NgModule, importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NeworganizationComponent } from './neworganization/neworganization.component';
import { AfterloginComponent } from './afterlogin/afterlogin.component';
import { OrganizationUserManagementComponent } from './organizationadmin/organization-user-management/organization-user-management.component';
import { DashboardComponent } from './organizationadmin/organization_admin_Home/dashboard.component';
import { SoftwareAdminDashboardComponent } from './softwareadmin/software-admin-dashboard/software-admin-dashboard.component';
import { UiElementsComponent } from './organizationadmin/ui-elements/ui-elements.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { LogindetailManageComponent } from './softwareadmin/software-admin-dashboard/software-admin-user-manage/logindetail-manage/logindetail-manage.component';
import { ProfiledetailManageComponent } from './softwareadmin/software-admin-dashboard/software-admin-user-manage/profiledetail-manage/profiledetail-manage.component';
import { SalesFormComponent } from './INF/sales/sales-form/sales-form.component';
import { SoftwareAdminUserManageComponent } from './softwareadmin/software-admin-dashboard/software-admin-user-manage/software-admin-user-manage.component';
import { InspectionInfComponent } from './INF/inspection-inf/inspection-inf.component';
import { InspectionFormComponent } from './INF/inspection-inf/inspection-form/inspection-form.component';
import { SalesHomeComponent } from './INF/sales/sales-home/sales-home.component';
import { SalesVComponent } from './INF/sales/sales-v/sales-v.component';
import { PlanningEngHomeComponent } from './INF/planning-eng-home/planning-eng-home.component';
import { PlanningEngInfComponent } from './INF/planning-eng-home/planning-eng-inf/planning-eng-inf.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ServicesComponent } from './services/services.component';
import { MailComponent } from './mail/mail.component';
import { InfPdfComponent } from './INF/inf-pdf/inf-pdf.component';
import { InspectorHomeComponent } from './inspector_dashboard/inspector-home/inspector-home.component';
import { ScheduledWorkComponent } from './scheduled-work/scheduled-work.component';
//import { SchedulePageComponent } from './inspector_dashboard/schedule-page/schedule-page.component';
import { MailAutomationInspComponent } from './inspector_dashboard/mail-automation-insp/mail-automation-insp.component';
import { ConfirmPageComponent } from './confirm-page/confirm-page.component';
import { SchedulePageComponent } from './inspector_dashboard/schedule-page/schedule-page.component';
import { RescheduleRequestComponent } from './INF/inspection-inf/reschedule-request/reschedule-request.component';
import { MailResponseComponent } from './mail-response/mail-response.component';
import { BasicDateComponent } from './inspector_dashboard/basic-date/basic-date.component';
import { UnitsDetailsComponent } from './inspector_dashboard/units-details/units-details.component';
import { AuthoDetailsComponent } from './inspector_dashboard/autho-details/autho-details.component';
import { ListingUnitsComponent } from './inspector_dashboard/listing-units/listing-units.component';
import { SectionComponent } from './inspector_dashboard/section/section.component';
import { BreifSpecComponent } from './inspector_dashboard/breif-spec/breif-spec.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PitComponent } from './inspector_dashboard/pit/pit.component';
import { PitcheckpointsComponent } from './inspector_dashboard/pit/pitcheckpoints/pitcheckpoints.component';
import { CabinComponent } from './inspector_dashboard/cabin/cabin.component';
import { OutBoxComponent } from './out-box/out-box.component';
import { CartopComponent } from './inspector_dashboard/cartop/cartop.component';
import { MachineroomComponent } from './inspector_dashboard/machineroom/machineroom.component';
import { FloorlandingComponent } from './inspector_dashboard/floorlanding/floorlanding.component';
import { CabincheckpointsComponent } from './inspector_dashboard/cabin/cabincheckpoints/cabincheckpoints.component';
import { CartopcheckpointComponent } from './inspector_dashboard/cartop/cartopcheckpoint/cartopcheckpoint.component';
import { FloorlandingcheckpointComponent } from './inspector_dashboard/floorlanding/floorlandingcheckpoint/floorlandingcheckpoint.component';
import { MachinroomcheckpointComponent } from './inspector_dashboard/machineroom/machinroomcheckpoint/machinroomcheckpoint.component';
import { ReportForElevComponent } from './inspector_dashboard/report-home/report-for-elev/report-for-elev.component';
import { ReportHomeComponent } from './inspector_dashboard/report-home/report-home.component';
import { AgreementPageComponent } from './inspector_dashboard/agreement-page/agreement-page.component';
import { SiteRiskAssessmentComponent } from './inspector_dashboard/site-risk-assessment/site-risk-assessment.component';
import { PreInspectionComponent } from './inspector_dashboard/pre-inspection/pre-inspection.component';
import { ListCertificateComponent } from './inspector_dashboard/list-certificate/list-certificate.component';
import { CertificateComponent } from './inspector_dashboard/certificate/certificate.component';
import { CertificateOComponent } from './certificate-o/certificate-o.component';
import { CertificateHomeComponent } from './inspector_dashboard/certificate-home/certificate-home.component';
import { UploadCertificateComponent } from './inspector_dashboard/certificate-home/upload-certificate/upload-certificate.component';
import { UploadPdfComponent } from './inspector_dashboard/certificate-home/upload-pdf/upload-pdf.component';
import { ViewofcertificateComponent } from './inspector_dashboard/certificate-home/viewofcertificate/viewofcertificate.component';
import { MoreOptionsComponent } from './inspector_dashboard/more-options/more-options.component';
import { ClosingMeetingComponent } from './inspector_dashboard/more-options/closing-meeting/closing-meeting.component';
import { CloseoutComponent } from './inspector_dashboard/more-options/closeout/closeout.component';
import { FeedBackFormComponent } from './inspector_dashboard/more-options/feed-back-form/feed-back-form.component';
import { KeyAbstractUnitsComponent } from './inspector_dashboard/more-options/key-abstract-units/key-abstract-units.component';
import { KeyAbstractComponent } from './inspector_dashboard/more-options/key-abstract/key-abstract.component';
// import { OutBoxComponent } from './out-box/out-box.component';
// import { UnitDetailsComponent } from './inspector_dashboard/unit-details/unit-details.component';
const routes: Routes = [

  {path:'app-home',component:AppHomeComponent,},
  {path:'pdf/:c_no',component:InfPdfComponent},
  {path:'certificate/:unit/:document_id',component:CertificateComponent},
  {path:'key_abstract/:unit/:document_id/:contract_no',component:KeyAbstractComponent},

  {path:'view_c/:unit/:document_id/:id/:contract',component:ViewofcertificateComponent},

  // {path:"",redirectTo:"app-home",pathMatch:'full'},
  {path: "services",component:ServicesComponent}, 
  {path:"login",component:LoginComponent},
  {path:"Mail_Response",component:MailResponseComponent},
  {path:"neworganization", component:NeworganizationComponent},
  {path:"forgotpassword",component:ForgotpasswordComponent},
  {path:"reset",component:ResetPasswordComponent},


  { path: 'ReportElevator1/:contractNumber/:documentid_For_Url', component: ReportForElevComponent },
  // '/afterlogin/software_admin_dashboard_user_manage/organization_admin_login_details'
  {path: 'afterlogin',component: AfterloginComponent,
    children: [
      
   
        {path:'mail',component:MailComponent},
        {path:'confirm-page',component:ConfirmPageComponent},
        {path:'software_admin_dashboard', component:SoftwareAdminDashboardComponent},
        {path:'software_admin_dashboard_user_manage', component:SoftwareAdminUserManageComponent,
        
        children:[
          {path:'organization_admin_login_details', component:LogindetailManageComponent},
          {path:'',redirectTo:'organization_admin_login_details',pathMatch:'full'},
          
          
        ]},
        // organization admin
        {path: 'dashboard', component: DashboardComponent},//home
        {path:'organization_adminUI', component:UiElementsComponent},// add elements
        {path:'app-organization-user-management',component:OrganizationUserManagementComponent},
        {path:'profile-manage',component:ProfiledetailManageComponent},


        // Inspector
        {path:"inspectorHome",component:InspectorHomeComponent},
        {path:'schedule_page',component:SchedulePageComponent},
        {path:'scheduledWork', component:ScheduledWorkComponent},
        {path:"mail_automation",component:MailAutomationInspComponent},
        {path:"ReportHome",component:ReportHomeComponent},
        {path:"ReportElevator",component:ReportForElevComponent},
        {path:"outbox",component:OutBoxComponent},
       

        
         {path:'inspection_home', component:InspectionInfComponent},
         {path:'RescheduleRequest',component:RescheduleRequestComponent},

         {path:'inspection_inf/:c_no',component:InspectionFormComponent},
         {path:'sales_home',component:SalesHomeComponent},
         {path:'sales_inf/:selectedOption', component:SalesFormComponent},
         {path:'sales_v/:selectedOption',component:SalesVComponent},
         {path:'plan_eg_home',component:PlanningEngHomeComponent },
         {path:'plan_eng_inf/:c_no',component:PlanningEngInfComponent},
         {path:'pdf/:c_no',component:InfPdfComponent},
         {path:'basic_data/:c_no',component:BasicDateComponent},
         {path:'unit_details/:c_no',component:UnitsDetailsComponent},
         {path:'auth/:c_no',component:AuthoDetailsComponent},
         {path:'unit/:c_no',component:ListingUnitsComponent},
         {path:'section/:c_no',component:SectionComponent},
         {path:'spec/:c_no',component:BreifSpecComponent},
         {path:'agreement/:c_no',component:AgreementPageComponent},
         {path:'risk/:c_no',component:SiteRiskAssessmentComponent},
         {path:'pre_ins/:c_no',component:PreInspectionComponent},
         {path:'upload_certificate/:c_no',component:UploadPdfComponent},
         {path:'list_certificate',component:ListCertificateComponent},
         {path:'certificate_home',component:CertificateHomeComponent},
         {path:'more_options',component:MoreOptionsComponent},
         {path:'closing_meeting/:c_no',component:CloseoutComponent},
         {path:'feedback/:c_no',component:FeedBackFormComponent},
         {path:'key_abstract_units/:c_no/:document_id',component:KeyAbstractUnitsComponent},
        
         {path:'pit/:c_no',component:PitComponent},
         { path: 'pitcheckpoint/:id/:documentid/:unitno/:inspectorname/:section', component: PitcheckpointsComponent },
         
         {path:'cabin/:c_no',component:CabinComponent},
        { path: 'cabincheckpoint/:id/:documentid/:unitno/:inspectorname/:section', component: CabincheckpointsComponent },
        
         {path:'cartop/:c_no',component:CartopComponent},
         { path: 'carcheckpoint/:id/:documentid/:unitno/:inspectorname/:section', component: CartopcheckpointComponent },
         
         {path:'machineroom/:c_no',component:MachineroomComponent},
         { path: 'machineroomcheckpoint/:id/:documentid/:unitno/:inspectorname/:section', component: FloorlandingcheckpointComponent },
         
         
         {path:'floorlanding/:c_no',component:FloorlandingComponent},
         { path: 'floorcheckpoint/:id/:documentid/:unitno/:inspectorname/:section', component: FloorlandingcheckpointComponent },
         
         
    ],
  },
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
