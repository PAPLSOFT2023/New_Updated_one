import { Component ,ViewChild, ElementRef,ViewChildren, QueryList} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';
// import { DataService } from 'src/app/data.service';
import { ApicallService } from 'src/app/apicall.service';
interface Row {
  name: string;
  designation: string;
  company: string;
  contact_number: string;
  signature: string; 
  role: string;
}
@Component({
  selector: 'app-closeout',
  templateUrl: './closeout.component.html',
  styleUrls: ['./closeout.component.scss']
})
export class CloseoutComponent {
  val:string | null='';
  // constructor(private route: ActivatedRoute,private dataService: ApicallService,private http :HttpClient,private router:Router){
   
  //   this.route.paramMap.subscribe(params => {
  //     this.val = params.get('c_no');
  //     console.log(this.val);
  //     if (this.val) {
  //       // sessionStorage.setItem('document_id', this.val); 
  //     }


      
  //   });
    

  // }
  @ViewChildren('canvas') canvasList!: QueryList<ElementRef<HTMLCanvasElement>>;

  // val:string | null='';
  constructor(private route: ActivatedRoute,private dataService: ApicallService,private http :HttpClient,private router:Router){
     this.route.paramMap.subscribe(params => {
      this.val = params.get('c_no');
      console.log(this.val);
      if(this.val){
        // sessionStorage.setItem('document_id', this.val); 
      }
      
    });

  }
  // rows: Row[] = [{ name: '', designation: '', company: '', contact_number: '' }];
  rows: Row[] = [
    { name: '', designation: '',role: '', company: '', contact_number: '',signature: '' },
    // { name: '', designation: '',role: '', company: '', contact_number: '',signature: '' },
    // { name: '', designation: '',role: '', company: '', contact_number: '' ,signature: ''},
    // { name: '', designation: '',role: '', company: '', contact_number: '',signature: '' }
  ];

  addRow() {
    this.rows.push({ name: '', designation: '', role: '', company: '', contact_number: '',signature: '' });
  }


  
  captureSignature(canvas: HTMLCanvasElement, index: number) {
    const ctx = canvas.getContext('2d')!;
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mousemove', (e) => {
      if (!isDrawing) return;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mouseup', () => {
      isDrawing = false;
      this.rows[index].signature = canvas.toDataURL('image/png');
    });

    canvas.addEventListener('mouseout', () => {
      isDrawing = false;
    });
  }
  clearSignature(rowIndex: number) {
    if (this.canvasList && this.canvasList.length > rowIndex) {
      const canvasRef = this.canvasList.toArray()[rowIndex];
      const canvas = canvasRef.nativeElement;
      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.rows[rowIndex].signature = ''; // Clear the signature data
    } else {
      console.error(`Canvas at index ${rowIndex} is not available.`);
    }
  }
  
  show(){
    const store_values={
      witness_details:this.rows,
      document_id:this.val
      


    }
    // console.log(this.rows);
    this.http.put('http://localhost:3000/api/update_data_close', store_values).subscribe(
      (response) => {
        // this.router.navigate(['afterlogin', 'risk',this.val]);
        // alert('thank you...!');
        if (confirm('Done..!')) {
          // Redirect to another page
          this.router.navigate(['afterlogin', 'more_options']);
        }

        
      },
      (error) => {
        console.error('Error storing data', error);
      }
    );

  }
  allFieldsFilled(): boolean {
    return this.rows.every(row =>
        row.name.trim() !== '' &&
        row.designation.trim() !== '' &&
        row.role.trim() !== '' &&
        row.company.trim() !== '' &&
        row.contact_number.trim() !== '' &&
        row.signature.trim() !== '' 
    );
}


}