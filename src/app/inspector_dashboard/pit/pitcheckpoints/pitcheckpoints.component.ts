import { Component,  ElementRef, ViewChild , AfterViewInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { ApicallService } from 'src/app/apicall.service';

@Component({
  selector: 'app-pitcheckpoints',
  templateUrl: './pitcheckpoints.component.html',
  styleUrls: ['./pitcheckpoints.component.scss']
})
export class PitcheckpointsComponent implements  AfterViewInit {
  title: string = "Card Title";
  referencea: string = "Card Reference";
  photoUrl: string = "https://example.com/photo.jpg";
  id!: string;
  dropdownArray: string[] = [];
  photoArray: string[] = [];
  reference:string[]=[];


  documentId:string='';
  unitNo:string='';
  inspectorName:string='';


 
  checkpoints: boolean[] = []; // Array to store checkpoint values (true or false)
  reports: boolean[] = []; //

  @ViewChild('videoElement') videoElement!: ElementRef;

  @ViewChild('canvas')
  public canvas!: ElementRef;

  public captures: Array<any> = [];
  cameraActive: boolean = false;



  ngAfterViewInit() {
    // Access the native element of the ViewChild after the view has been initialized
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    // Do something with the video element, such as setting up camera access
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          video.srcObject = stream;
          video.play();
        })
        .catch((error) => {
          console.error('Error accessing camera:', error);
        });
    } else {
      console.error('getUserMedia is not supported');
    }
  }
  
  constructor(private route: ActivatedRoute,private apicallservice:ApicallService) { } 
  ngOnInit(): void {
    // Retrieve the id parameter from the route snapshot
    const encodedId = this.route.snapshot.paramMap.get('id');
   
    this.documentId = this.route.snapshot.paramMap.get('documentid') || ''; // Use type assertion and provide a default value
    this.unitNo = this.route.snapshot.paramMap.get('unitno') || ''; // Use type assertion and provide a default value
    this.inspectorName = this.route.snapshot.paramMap.get('inspectorname') || ''; // Use type assertion and provide a default value
    // Do whatever you need with the id parameter
    if (encodedId) {
      this.id = decodeURIComponent(encodedId);
      // Do whatever you need with the id parameter
      this.title=this.id;
      console.log('ID:', this.id);
      this.apicallservice.get_insp_master_checklist(this.id).subscribe((response:any)=>{

        if(response)
        {
          this.dropdownArray=response[0].Dropdown.split('~');
          this.photoArray=response[0].Photo.split('~');
          this.reference=response[0].Reference.split('~');    
        }

      },(error:any)=>{})

      
    } else {
      console.error('ID parameter is missing.');
    }
  }

 
  save(): void {
    // Add your save logic here
    console.log('Save button clicked',this.id,this.documentId,this.unitNo,this.inspectorName);

    for (let i = 0; i < this.dropdownArray.length; i++) {
      // Store dropdown value
      const dropdownValue = this.dropdownArray[i];
      // Store checkpoint value
      const checkpointValue = this.checkpoints[i] || false; // Default value is false if not checked
      // Store report value
      const reportValue = this.reports[i] || false; // Default value is false if not checked
      
      // Do whatever you need with the values, for example, push them into an array
      console.log(`Dropdown Value ${i + 1}: ${dropdownValue}`);
      console.log(`Checkpoint ${i + 1}: ${checkpointValue}`);
      console.log(`Need for Report ${i + 1}: ${reportValue}`);
    }
    
    // You can perform any save operations or define any logic you need here
  }
  // Component Logic (TypeScript)

  public openCamera(index: number) {
    // Toggle the cameraActive property
    this.cameraActive = !this.cameraActive;
    if (this.cameraActive) {
      // If camera is active, show the video element
      this.showVideo();
    } else {
      // If camera is not active, show the photo element
      this.showPhoto(index);
    }
  }
  
  private showVideo() {
    // Assuming this.photoUrl contains the URL of the image to be displayed
    const video: HTMLVideoElement = this.videoElement.nativeElement;
    video.srcObject = null; // Reset any previous video stream
    video.src = this.photoUrl; // Set the image URL as the source
    video.play(); // Start playing the image
  }
  
  
  private showPhoto(index: number) {
    const inputId = 'photoUpload' + index;
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    if (fileInput) {
      fileInput.setAttribute('capture', 'environment');
      fileInput.click();
    } else {
      console.error(`Element with ID '${inputId}' not found.`);
    }
  }
  

  

handleFileInput(event: any, index: number): void {
  const file = event.target.files[0]; // Get the selected file
  // Process the file as needed, for example, you can display the image or upload it to a server
  console.log('Selected file:', file);
  // Here, you can also update your photoArray with the selected file's data or perform any other actions you need.
  // For example, if you're storing the file data in an array:
  // this.photoArray[index] = file;
}

}