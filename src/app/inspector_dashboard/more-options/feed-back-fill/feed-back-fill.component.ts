import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-feed-back-fill',
  templateUrl: './feed-back-fill.component.html',
  styleUrls: ['./feed-back-fill.component.scss']
})
export class FeedBackFillComponent {
  uploadFiles: any[] = [];

  constructor(private http: HttpClient,private sanitizer: DomSanitizer,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchUploadFiles();
  }

  fetchUploadFiles() {
    this.http.get<any[]>('http://localhost:3000/api/feed_back_fetch').subscribe(data => {
      this.uploadFiles = data;
      console.log('full data is',this.uploadFiles);
    });
  }

  displayPDF(document_id:string){
    if (document_id) {
      this.router.navigate(['afterlogin','feedback', document_id]).then(
        () => console.log('Navigation successful'),
        (error) => console.error('Navigation failed:', error)
      );
    } else {
      console.error('Invalid unit value:');
    }
  }


}
