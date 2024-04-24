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
   syncing: boolean = false;
   DataNotAvai:string="No Data Available in OutBox"

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
  console.log("All records:", JSON.stringify(this.allValues));
};

getAllRequest.onerror = () => console.error("Error retrieving records", getAllRequest.error);
 
  }
}





syncData(): void {
  this.syncing = true;
  const syncPromises = this.allValues.map((value) => {
    // console.log("OutBox ",value)
    return this.apicallservice.syncValue(value).toPromise();
  });
  const syncStartedAt = Date.now();
  Promise.all(syncPromises)
    .then((results) => {
      console.log('Data synchronized successfully', results);

      
      deleteMultipleFromIndexedDB(results);

      // Iterate through results array
      results.forEach((result: any) => {
      // Check if message is "Data synchronization complete"
      if (result.message === "Data synchronization complete") {
      // Extract the key from the result object
      const keyToRemove = result.key;

      // Find the index of the object in allValues array with the same key
      const indexToRemove = this.allValues.findIndex((value: any) => value.key === keyToRemove);

      // If index is found (not -1), remove the object from allValues array
      if (indexToRemove !== -1) {
          this.allValues.splice(indexToRemove, 1);
      }
     }
       });
       this.DataNotAvai="Synced Successfull"



    })
    .catch((error) => {
      console.error('Error synchronizing data', error); 
    })
    .finally(() => {
      const syncEndedAt = Date.now();
      const elapsedTime = syncEndedAt - syncStartedAt;
      const minDisplayTime = 3000;
      if (elapsedTime < minDisplayTime) {
        setTimeout(() => {
          this.syncing = false;
        }, minDisplayTime - elapsedTime);
      } 
      else {
        this.syncing = false;
      }
    });
}



}




async function openIndexedDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("OutBox", 1); // Adjust the name and version as needed

    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains("Offline")) {
        db.createObjectStore("Offline", { keyPath: "id" }); // Adjust according to your keyPath or use autoIncrement
      }
    };

    request.onsuccess = () => {
      console.log("Database opened successfully");
      resolve(request.result);
    };

    request.onerror = () => {
      console.error("Error opening database:", request.error);
      reject(request.error);
    };
  });
}


async function deleteFromIndexedDB(key: string): Promise<void> {
  try {
    const db = await openIndexedDB();
    const transaction = db.transaction(["Offline"], "readwrite");
    const store = transaction.objectStore("Offline");
    const request = store.delete(key);

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        console.log(`Transaction completed for key: ${key}`);
      };

      request.onsuccess = () => {
        console.log("Entry deleted successfully");
        
        resolve();
      };

      request.onerror = () => {
        console.error("Error deleting entry from IndexedDB", request.error);
        reject(request.error);
      };
    });
  } catch (error) {
    console.error("Error deleting entry from IndexedDB", error);
    throw error; // Ensure upstream error handling
  }
}






async function deleteMultipleFromIndexedDB(keyObjects: { key: string }[]): Promise<void> {
  try {
    for (const keyObject of keyObjects) {
      const key = keyObject.key; // Extract the key from the object
      console.log("deleteMultipleFrom called", key);
      await deleteFromIndexedDB(key);
    }
  } catch (error) {
    console.error("Error deleting multiple entries from IndexedDB", error);
  }
}