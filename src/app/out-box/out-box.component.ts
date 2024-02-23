import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from '../apicall.service';

@Component({
  selector: 'app-out-box',
  templateUrl: './out-box.component.html',
  styleUrls: ['./out-box.component.scss']
})
export class OutBoxComponent {

   allValues!: any[];

  constructor(private route: ActivatedRoute,private apicallservice:ApicallService) {

    this.getvalu();
   } 


getvalu(){

  interface ValuesObj {
    key: string;
    documentId: string;
    inspectorName: string;
    unitNo: string;
    title: string;
    valueArray: string[];
    checkpoint: boolean[];
    capturedImages: any[];
    needForReport: boolean[]; 
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




// Example: Retrieving all records
const getAllRequest: IDBRequest<ValuesObj[]> = offlineStore.getAll();

getAllRequest.onsuccess = () => {
   this.allValues = getAllRequest.result;
  console.log("All records:", this.allValues);
};

getAllRequest.onerror = () => console.error("Error retrieving records", getAllRequest.error);
 
  }
}

}