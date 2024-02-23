import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { ApicallService } from 'src/app/apicall.service';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-pitcheckpoints',
  templateUrl: './pitcheckpoints.component.html',
  styleUrls: ['./pitcheckpoints.component.scss']
})
export class PitcheckpointsComponent  {


  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef;
  @ViewChild('imageElement') imageElement!: ElementRef;


  title: string = "Card Title";
  
  id!: string;
  dropdownArray: string[] = [];
  photoArray: string[] = [];
  reference:string[]=[];


  documentId:string='';
  unitNo:string='';
  inspectorName:string='';
  Camera_popup:boolean=false;
 


 


 
 videoStream!: MediaStream;
  isCameraActive = false;
  isImageCaptured = false;
  camera_index!:number;
  showImageView: boolean = false; // Controls whether to display the image view container
selectedImageUrl: string = ''; // Holds the URL of the selected image


  capturedImages!: Blob[];
  inputValues: number[] = new Array(this.dropdownArray.length).fill(0);
  checkpoint!: boolean[];
  NeedforReport!: boolean[];
  photoSelected!: boolean[]; // for image file name highlight in green


  
 


  private beforeUnloadSubscription!: Subscription;


  










  constructor(private route: ActivatedRoute,private apicallservice:ApicallService) { } 


  ngOnInit(): void {

    // this.beforeUnloadSubscription = fromEvent(window, 'beforeunload').subscribe((event) => {
    //   event.preventDefault();
    //   event.returnValue = true;
    // });



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





save(): void {
  const valueArray: string[] = [];
  var indexedDB_support:Boolean=false;
  if ( ('indexedDB' in window)) {
    // IndexedDB is supported
    indexedDB_support=true
    console.log('IndexedDB is supported',(navigator.onLine));
}
 else {
  alert("Your browser does not have a data sync option. Please ensure that the internet connection is active.");
  indexedDB_support=false;
   
    console.log('IndexedDB is not supported');
}



  for (let i = 0; i < this.dropdownArray.length; i++) {
    const item = this.dropdownArray[i];
    if (item.includes('---')) {
      const parts = item.split('---');
      const newValue = `${parts[0]} ${this.inputValues[i]} ${parts[1]}`;
      valueArray.push(newValue.replace(/\bundefined\b/g, '---'));
    } else {
      valueArray.push(item);
    }
  }



  if((navigator.onLine) )
  {

    if(indexedDB_support)
    {

      interface ValuesObj {
        key: string;
        documentId: string;
        inspectorName: string;
        unitNo: string;
        title: string;
        valueArray: string[];
        checkpoint: boolean[];
        capturedImages: any[];
        needForReport: boolean[]; // Corrected the casing of 'needForReport'
        
        updatedAt: Date; // Property to store the last update date and time
      }
        
        const openRequest: IDBOpenDBRequest = indexedDB.open("OutBox", 1);
    
        openRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
      const offlineStore: IDBObjectStore = db.createObjectStore("Offline", { keyPath: "key" });
        };
        openRequest.onerror = (event) => {
      console.error("IndexedDB error:", openRequest.error);
        };
        openRequest.onsuccess = (event) => {
      const db: IDBDatabase = openRequest.result;
      // Example: Adding a record
      const transaction: IDBTransaction = db.transaction("Offline", "readwrite");
      const offlineStore: IDBObjectStore = transaction.objectStore("Offline");
    
      const now = new Date(); // Get the current date and time

const valueObj: ValuesObj = {
  key: this.documentId + "+" + this.title,
  documentId: this.documentId,
  inspectorName: this.inspectorName,
  unitNo: this.unitNo,
  title: this.title,
  valueArray: valueArray,
  checkpoint: this.checkpoint,
  capturedImages: this.capturedImages,
  needForReport: this.NeedforReport,
 
  updatedAt: now // Set the last update date and time
};
    
      const request: IDBRequest<IDBValidKey> = offlineStore.add(valueObj);
    
      request.onsuccess = () => {
       
      alert("Your device doesn't have an internet connection. Data saved locally.")
      
      }
      request.onerror = () => {
        console.log(request.error)

        if (request.error instanceof DOMException && request.error.message === "Key already exists in the object store.") {
          // Handle the case where the key already exists
          alert("This Data already exists!");
      } 
      }
    
      // Example: Retrieving all records
      const getAllRequest: IDBRequest<ValuesObj[]> = offlineStore.getAll();
    
      getAllRequest.onsuccess = () => {
        const allValues: ValuesObj[] = getAllRequest.result;
        console.log("All records:", allValues);
      };
    
      getAllRequest.onerror = () => console.error("Error retrieving records", getAllRequest.error);
       
    
    
    
    
    };   
      }
    
      else{
        alert("Warning: No internet connection and No Data Sync.in Locally, You cannot store data.")
      }
        
           



  }
  else{

    this.apicallservice.insert_Pit_Values(this.documentId,this.inspectorName,this.unitNo,this.title,valueArray,this.checkpoint,this.capturedImages,this.NeedforReport).subscribe((result:any)=>{
      if(result)
      {
        console.log("res",result,"--",navigator.onLine);
        alert(result)
      }
  
     },(error:any)=>{ 
      alert(error)
     });
  }
 
}


}