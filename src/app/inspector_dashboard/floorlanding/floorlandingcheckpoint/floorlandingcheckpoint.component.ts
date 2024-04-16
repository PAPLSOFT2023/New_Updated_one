import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { ApicallService } from 'src/app/apicall.service';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-floorlandingcheckpoint',
  templateUrl: './floorlandingcheckpoint.component.html',
  styleUrls: ['./floorlandingcheckpoint.component.scss']
})
export class FloorlandingcheckpointComponent {

  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef;
  @ViewChild('imageElement') imageElement!: ElementRef;


  title: string = "Card Title";
  
  id!: string;
  dropdownArray: string[] = [];
  photoArray: string[] = [];
  reference:string[]=[];

  positive_MNT:number=0;
  positive_ADJ:number=0;
  Negative_MNT:string[]=[];
  Negative_ADJ:string[]=[];
  Emergency_Features:boolean=false;
  Customerscope:boolean=false;


  documentId:string='';
  unitNo:string='';
  inspectorName:string='';
  section:string='';
  Camera_popup:boolean=false;
 disable:boolean=true;

 


 
 videoStream!: MediaStream;
  isCameraActive = false;
  isImageCaptured = false;
  camera_index!:number;
  showImageView: boolean = false; // Controls whether to display the image view container
selectedImageUrl: string = ''; // Holds the URL of the selected image
hideAllDoneButton: boolean = false;

defect_button_flag:boolean=true;
satisfied_button_flag:boolean=true;
save_button_enable_flag:boolean=false
  capturedImages!: Blob[];
  inputValues: number[] = new Array(this.dropdownArray.length).fill(0);
  checkpoint!: boolean[];
  NeedforReport!: boolean[];
  photoSelected!: boolean[]; // for image file name highlight in green


  private beforeUnloadSubscription!: Subscription;

  constructor(private route: ActivatedRoute,private apicallservice:ApicallService) { } 


  ngOnInit(): void {

    const encodedId = this.route.snapshot.paramMap.get('id');

    this.section=this.route.snapshot.paramMap.get('section')||'section Not Get';
   
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
          this.Negative_MNT=response[0].Negative_MNT.split('~');
          this.Negative_ADJ=response[0].Negative_ADJ.split('~');

          this.positive_ADJ=response[0].Positive_ADJ;
          this.positive_MNT=response[0].Positive_MNT;
         this.Emergency_Features=response[0].Emergency_Features;
         this.Customerscope=response[0].Customer_Scope;
         

           this.photoSelected = new Array(this.dropdownArray.length).fill(false);
           this.checkpoint= new Array(this.dropdownArray.length).fill(false);
          this.NeedforReport = new Array(this.dropdownArray.length).fill(false);
          this.capturedImages=new Array(this.dropdownArray.length).fill(null);
         
        }

      },(error:any)=>{})

      
    } else {
      console.error('ID parameter is missing.');
    }

 
  }
    ngOnDestroy() {
    if (this.beforeUnloadSubscription) {
      this.beforeUnloadSubscription.unsubscribe();
    }


  }


 
 
  
  
 
  

  handleFileInput(event: any, index: number): void {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      console.log('Selected file:', file);
  
      // Store the Blob object directly in the capturedImages array
      this.capturedImages[index] = file;
      this.photoSelected[index] = true;
      console.log("Captured Blob:", this.capturedImages[index]);
    } else {
      console.error('No file selected');
    }
  }
  
  

  
  
  
  


// take picture 
takePicture(index:number):void{
  this.camera_index=index;
  this.isCameraActive=!this.isCameraActive;
  this.openCamera();
}

openCamera(): void {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream: MediaStream) => {
      this.videoStream = stream;
      this.videoElement.nativeElement.srcObject = stream;
      this.isCameraActive = true;
    })
    .catch((error) => {
      console.error('Error accessing camera:', error);
    });
}

captureImage(): void {
  const video = this.videoElement.nativeElement;
  const canvas = this.canvasElement.nativeElement;
  const context = canvas.getContext('2d');

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Hide the video element
  video.style.display = 'none';

  // Hide the canvas element
  canvas.style.display = 'none';

  // Show the captured image in the <img> element
  this.imageElement.nativeElement.src = canvas.toDataURL('image/jpeg');
  this.imageElement.nativeElement.style.display = 'block';
  this.isImageCaptured = true;
}

retakePicture(): void {
  const video = this.videoElement.nativeElement;
  const canvas = this.canvasElement.nativeElement;

  // Show the video element
  video.style.display = 'block';

  // Hide the canvas element
  canvas.style.display = 'none';

  // Clear the captured image
  this.imageElement.nativeElement.src = '';
  this.imageElement.nativeElement.style.display = 'none';
  this.isImageCaptured = false;
}


// +++++++++++++++++++++++++++++++++++++++++=

confirmImage(): void {
  // Ensure capturedImages array is initialized
  if (!this.capturedImages) {
    this.capturedImages = [];
  }

  // Get the image element
  const imageElement: HTMLImageElement = this.imageElement.nativeElement;

  // Fetch the image source as a Blob
  fetch(imageElement.src)
    .then(response => response.blob())
    .then(blob => {
      // Store the Blob data in the capturedImages array
      this.capturedImages[this.camera_index] = blob;

      // Hide the video element and captured image element
      this.videoElement.nativeElement.style.display = 'none';
      imageElement.style.display = 'none';

      // Reset image capture state
      this.isImageCaptured = false;

      // Stop the video stream
      this.videoStream.getTracks().forEach(track => track.stop());
      this.isCameraActive = false;

      // Change the color of the camera icon
      const cameraIcon = document.getElementById(`photoUpload${this.camera_index}`);
      if (cameraIcon) {
        cameraIcon.style.color = 'Red';
      }
    })
    .catch(error => {
      console.error('Error fetching image data:', error);
      // Handle error fetching image data
    });
}


cancelCapture(): void {
  // Clear the captured image if present
  this.imageElement.nativeElement.src = '';
  this.isImageCaptured = false;

  // Stop the video stream
  this.videoStream.getTracks().forEach(track => track.stop());
  this.isCameraActive = false;
}


viewImage(index: number): void {
  console.log(this.capturedImages[index])




  // Check if the capturedImages array contains an image at the specified index
  if (this.capturedImages[index]) {
    // Check if the data at the specified index is a Blob
    if (this.capturedImages[index] instanceof Blob) {
      // Convert the data to a Blob object
      const blobImage: Blob = this.capturedImages[index];

      // Create a URL for the Blob
      const imageUrl = URL.createObjectURL(blobImage);

      // Set the URL to display the image
      this.selectedImageUrl = imageUrl;

      // Show the image view container
      this.showImageView = true;
    } else {
      // If the data is not a Blob, display an error message
      alert('Invalid image data.');
    }
  } else {
    // If there is no image at the specified index, display a message
    alert('No image available for this index.');
  }
}


closeImageView(): void {
  // Hide the image view container
  this.showImageView = false;

  // Revoke the URL of the Blob image to release memory
  URL.revokeObjectURL(this.selectedImageUrl);

  // Clear the selected image URL
  this.selectedImageUrl = '';
}



save_button_enable_fun(){
 this.disable=!this.disable
 this.hideAllDoneButton = !this.hideAllDoneButton;
  
  this.save_button_enable_flag=!this.save_button_enable_flag;
}


async save(): Promise<void> {
  const valueArray: string[] = this.dropdownArray.map((item, index) => {
    if (item.includes('---')) {
      const parts = item.split('---');
      return `${parts[0]} ${this.inputValues[index] || '---'} ${parts[1]}`;
    }
    return item;
  });

  if (navigator.onLine) {
    // Online - Submit data to server
    this.submitDataToServer(valueArray).then(() => {
      // console.log("Data submitted successfully");
      if ('indexedDB' in window) {
        this.saveDataLocally(valueArray,this.Negative_ADJ,this.Negative_MNT).then(() => {
          // console.log("Data saved successfully");  
        }).catch((error) => {
          console.error("Error saving data locally:", error);
        });
      }
    }).catch((error) => {
      console.error("Error submitting data to server:", error);
    });
  } 
  else {
    // Offline - Save data locally
    if ('indexedDB' in window) {
      this.saveDataLocally(valueArray,this.Negative_ADJ,this.Negative_MNT).then(() => {
        alert("Data saved to OutBox");
      }).catch((error) => {
        console.error("Error saving data locally:", error);
      });
    } 
    else {
      alert("Your browser does not support offline data saving.");
    }
  }
}

private async submitDataToServer(valueArray: string[]): Promise<void> {
  // Replace with your API call logic
 
  try {
    const result = await this.apicallservice.insert_Record_Values(
      this.documentId, 
      this.inspectorName,
      this.section,
      
      this.unitNo, 
      this.title, 
      valueArray, 
      this.positive_MNT,
      this.positive_ADJ,
      this.Negative_MNT,
      this.Negative_ADJ,      
      this.Emergency_Features,
      this.Customerscope,
     
      this.checkpoint, 
      this.capturedImages, 
      this.NeedforReport
    ).toPromise();
    alert(result);
  } catch (error) {
    alert("Failed to submit data: " + error);
  }
}

private async saveDataLocally(valueArray: string[],Negative_ADJ:string[],Negative_MNT:string[]): Promise<void> {
  const db = await this.openIndexedDB();
  const transaction = db.transaction("Offline", "readwrite");
  const store = transaction.objectStore("Offline");

  const valueObj = {
    key: `${this.documentId}+${this.title}`,
    documentId: this.documentId,
    inspectorName: this.inspectorName,
    section:this.section,
    unitNo: this.unitNo,
    title: this.title,
    valueArray,
    checkpoint: this.checkpoint,
    capturedImages: this.capturedImages,
    needForReport: this.NeedforReport,
    positive_MNT: this.positive_MNT,
   positive_ADJ:this.positive_ADJ,
   Negative_MNT,
  Negative_ADJ,
  emergency_Features:this.Emergency_Features,
  customerscope:this.Customerscope,
    updatedAt: new Date()
  };

  try {
    await store.add(valueObj);
    // alert("Data Also copied to OutBox");
  } 
  catch (error) {
    if (error instanceof DOMException && error.name === "ConstraintError") {
      // alert("This data already exists!");
    } else {
      console.error("Error saving data locally:", error);
    }
  }
}

private async openIndexedDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("OutBox", 1);
    request.onupgradeneeded = event => {
      const db = request.result;
      db.createObjectStore("Offline", { keyPath: "key" });
    };
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}




}