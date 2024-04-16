import { Component,ChangeDetectionStrategy  } from '@angular/core';
interface ListItem {
  value: string;
  selected: boolean;
}
@Component({
  selector: 'app-unitselectionfor-report',
  templateUrl: './unitselectionfor-report.component.html',
  styleUrls: ['./unitselectionfor-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitselectionforReportComponent {

  selectedUnits: string[] = [];
  selectedImages: { [key: number]: string } = {};
  showTable = false;
  proceedClicked = false;

  constructor() {}

  onFileSelected(event: any, pitId: number) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImages[pitId] = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  updateSelectedUnits(unit: string, event: any) {
    if (event.target && event.target.checked) {
      this.selectedUnits.push(unit);
    } else {
      const index = this.selectedUnits.indexOf(unit);
      if (index !== -1) {
        this.selectedUnits.splice(index, 1);
      }
    }
  }

  toggleTable() {
    if (!this.proceedClicked && this.selectedUnits.length > 0) {
      this.proceedClicked = true;
      this.showTable = true;
    }
  }

  getUnitColumn(unit: string): boolean {
    return this.selectedUnits.includes(unit) && this.proceedClicked;
  }
}