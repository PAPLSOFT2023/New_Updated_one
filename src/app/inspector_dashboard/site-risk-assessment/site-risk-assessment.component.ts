import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicallService } from 'src/app/apicall.service';

@Component({
  selector: 'app-site-risk-assessment',
  templateUrl: './site-risk-assessment.component.html',
  styleUrls: ['./site-risk-assessment.component.scss']
})
export class SiteRiskAssessmentComponent {
  riskAssessments: any[] = [];
  jsonData: any[] = [];
  contract_no: string | null = '';
  isFormValid: boolean = false; // Declaration of isFormValid property

  constructor(private route: ActivatedRoute, private dataService: ApicallService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/api/risk-assessments').subscribe(data => {
      this.riskAssessments = data.map(assessment => ({ ...assessment, selectedValue: '' }));
    });
  }

  generateJSON(): void {
    this.jsonData = this.riskAssessments.map(assessment => ({
      description: assessment.description,
      selectedValue: assessment.selectedValue
    }));
    const document_id = sessionStorage.getItem('document_id');
    this.contract_no = sessionStorage.getItem('contract_no');

    const store_values = {
      risk: this.jsonData,
      document_id: document_id
    };

    console.log(this.jsonData);
    // Here you can send this.jsonData to your server or use it as needed
    this.http.put('http://localhost:3000/api/update_data_s', store_values).subscribe(
      (response) => {
        this.router.navigate(['afterlogin', 'basic_data', this.contract_no]);
      },
      (error) => {
        console.error('Error storing data', error);
      }
    );
  }

  updateSelectedValue(assessment: any, value: string): void {
    assessment.selectedValue = value;
    this.validateForm();
  }

  private validateForm(): void {
    let isFormValid = true;
    const isAssessment6or7SelectedYes = this.riskAssessments.some(assessment => [6, 7].includes(assessment.id) && assessment.selectedValue === 'Yes');
  
    if (isAssessment6or7SelectedYes) {
      isFormValid = false;
    } else {
    
      const isAnyAssessmentNotSelectedYes = Array.from({ length: 13 }, (_, i) =>
        ![6, 7].includes(i + 1) && !this.riskAssessments.some(assessment => assessment.id === i + 1 && assessment.selectedValue === 'Yes')
      );
    
      
      if (isAnyAssessmentNotSelectedYes.some(isSelected => isSelected)) {
        isFormValid = false;
      }
    }
    this.isFormValid = isFormValid;
  }
  

}
