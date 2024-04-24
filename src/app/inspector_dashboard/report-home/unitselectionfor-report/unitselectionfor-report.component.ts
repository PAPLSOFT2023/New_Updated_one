import { Component,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { ApicallService } from 'src/app/apicall.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportDataService } from 'src/app/Data/report-data.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
interface ListItem {
  value: string;
  selected: boolean;
}
interface Image {
  img: string; // Assuming the blob data is stored as base64 encoded string
}
@Component({
  selector: 'app-unitselectionfor-report',
  templateUrl: './unitselectionfor-report.component.html',
  styleUrls: ['./unitselectionfor-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitselectionforReportComponent {

  Description_and_Parts:{Description:string,Parts:string}[]=[]
  parts_for_UI:string[]=[]

  images: Image[] = [];



  selectedFile: File | null = null;
  imageUrl: any | null = null;





  selectedUnits: { unit: string, isSelected: boolean }[] = [];
  selectedOrder: string[] = [];
  showSecondTable = false;
  unit: string[] = [];
  unitArray: { unit: string, isSelected: boolean }[] = [];


  documentidForUrl: string="";
  contractNo:string="";


  constructor(private router:Router,private sanitizer: DomSanitizer,private http: HttpClient,private apicallservice: ApicallService,public dataservice:ReportDataService, private route: ActivatedRoute,private cdr: ChangeDetectorRef) {
    this.loadUnits();


  }
  ngOnInit(){
    
  }



  toggleSelection(unit: { unit: string, isSelected: boolean }) {
    // Update selectedUnits array with the current selection state
    if (unit.isSelected) {
      this.selectedUnits.push(unit);
    } else {
      // Remove the unit from selectedUnits array if it's unchecked
      const index = this.selectedUnits.findIndex(selectedUnit => selectedUnit.unit === unit.unit);
      if (index !== -1) {
        this.selectedUnits.splice(index, 1);
      }
    }
  }
 




  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadImage(): void {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post<any>('http://localhost:3000/api/uploadimg', formData)
      .subscribe(
        (response) => {
          console.log('Image uploaded successfully:', response);
          this.imageUrl = response.imageUrl;
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
  }
 
  getImages(): void {
    this.http.get('http://localhost:3000/api/images/' , { responseType: 'blob' })
    .subscribe(
      (response: Blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = () => {
          // Set the received Data URL as the image URL
          this.imageUrl = reader.result as string;
        };
      console.log("ii", this.imageUrl)
      },
      (error) => {
        console.error('Error fetching image:', error);
      }
    );
  }

  // Function to convert ArrayBuffer to base64 string
  arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  GenReport(){
    this.router.navigate(['/Report_View',this.contractNo,this.documentidForUrl]);
  }
 
  proceed() {
   
      
    console.log("descri",this.Description_and_Parts)
      this.selectedOrder = [];
      for (let unit of this.selectedUnits) {
        this.selectedOrder.push(unit.unit);
      }
      this.showSecondTable = true;
      this.parts_for_UI=this.dataservice.Orderd_parts
      this.dataservice.Order_unit=this.selectedOrder;
      console.log("***",this.documentidForUrl,this.selectedOrder)
      this.getImages();

      // this.apicallservice.getChecklist_Record_Val_with_unit(this.documentidForUrl,this.selectedOrder).subscribe((record_data:any)=>{
      //   if (record_data)
      //   {
         
      //     this.dataservice.Dataservice_Record_Values=[];
          

      //     record_data.forEach((item: any) => {
      //       const recordValue = {
      //         checked: item.checked,
      //         description: item.description,
      //         document_id: item.document_id,
      //         dropdown_option: item.dropdown_option,
      //         id: item.id,
      //         img: item.img,
      //         inspector_name: item.inspector_name,
      //         needforReport: item.needforReport,
      //         section: item.section,
      //         unit_no: item.unit_no,
      //         Customer_Scope:item.Customer_Scope,
      //         Emergency_Features:item.Emergency_Features,
      //         Negative_ADJ:item.Negative_ADJ,
      //         Negative_MNT:item.Negative_MNT,
      //         Positive_ADJ:item.Positive_ADJ,
      //         Positive_MNT:item.Positive_MNT
      //       };

      //       console.log("?",item.id)
      //       this.dataservice.Dataservice_Record_Values.push(recordValue);
      //     });

          
            

      //     console.log("***", this.dataservice.Dataservice_Record_Values,this.Description_and_Parts)
      //   }
      // });
    
  }
// load the available units for selection
  loadUnits() {
    this.contractNo = this.route.snapshot.params['contractNumber'];
    this .documentidForUrl = decodeURIComponent(this.route.snapshot.params['documentid_For_Url']);
    this.apicallservice.getUnitNumbers(this.contractNo, this.documentidForUrl).subscribe((result: any) => {
      if (result) {
        console.log("&*&",result)
        this.unit = JSON.parse(result.unit[0].unit_no);
        this.dataservice.Orderd_parts=[];
        this.dataservice.Orderd_parts = result.parts.map((item: any) => item.Parts);

        console.log("%%",this.dataservice.Orderd_parts)
        this.unitArray = this.unit.map((unit: string) => ({ unit: unit, isSelected: false }));
        this.Description_and_Parts=result.descriptionParts;


      


        this.cdr.detectChanges();
      }
    });
}

getImageSrc(bufferData: any): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    if (!bufferData || !Array.isArray(bufferData.data)) {
      reject('Invalid buffer data');
      return;
    }

    // Convert array of numbers to Uint8Array
    const uint8Array = new Uint8Array(bufferData.data);

    // Convert Uint8Array to ArrayBuffer
    const arrayBuffer = uint8Array.buffer;

    // Create a Blob from the ArrayBuffer
    const blob = new Blob([arrayBuffer], { type: 'image/png' });

    // Use FileReader to read the Blob as a data URL
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('Failed to convert ArrayBuffer to data URL');
      }
    };
    reader.readAsDataURL(blob);
  });
}





  
}