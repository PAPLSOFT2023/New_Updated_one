import { Component ,ViewChild, ElementRef,ViewChildren, QueryList} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';
// import { DataService } from 'src/app/data.service';
import { ApicallService } from 'src/app/apicall.service';
// import { SignaturePadOptions } from 'ngx-signaturepad';

interface Row {
  name: string;
  designation: string;
  company: string;
  contact_number: string;
  signature: string; 
}
@Component({
  selector: 'app-autho-details',
  templateUrl: './autho-details.component.html',
  styleUrls: ['./autho-details.component.scss']
})

export class AuthoDetailsComponent {
  @ViewChildren('canvas') canvasList!: QueryList<ElementRef<HTMLCanvasElement>>;

  val:string | null='';
  constructor(private route: ActivatedRoute,private dataService: ApicallService,private http :HttpClient,private router:Router){
     this.route.paramMap.subscribe(params => {
      this.val = params.get('c_no');
      console.log(this.val);
      if(this.val){
        sessionStorage.setItem('document_id', this.val); 
      }
      
    });

  }
  // rows: Row[] = [{ name: '', designation: '', company: '', contact_number: '' }];
  rows: Row[] = [
    { name: '', designation: '', company: '', contact_number: '',signature: '' },
    { name: '', designation: '', company: '', contact_number: '',signature: '' },
    { name: '', designation: '', company: '', contact_number: '' ,signature: ''},
    { name: '', designation: '', company: '', contact_number: '',signature: '' }
  ];

  addRow() {
    this.rows.push({ name: '', designation: '', company: '', contact_number: '',signature: '' });
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
    this.http.put('http://localhost:3000/api/update_data_w', store_values).subscribe(
      (response) => {
        this.router.navigate(['afterlogin', 'risk',this.val]);

        
      },
      (error) => {
        console.error('Error storing data', error);
      }
    );

  }
}
