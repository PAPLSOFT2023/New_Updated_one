import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApicallService } from 'src/app/apicall.service';


@Component({
  selector: 'app-multiple-inspector',
  templateUrl: './multiple-inspector.component.html',
  styleUrls: ['./multiple-inspector.component.scss']
})
export class MultipleInspectorComponent {

  items: { name: string, checked: boolean, headChecked:boolean,fromDate:Date,toDate:Date }[] = [];
  items1:{name: string, checked: boolean,headChecked:boolean,fromDate:Date,toDate:Date}[]=[];
  checkedItems1: { name: string, headChecked: boolean, fromDate: Date, toDate: Date }[] = [];

  checkedItems: string[] = []; // Array to store checked item names
  uncheckedItems: string[] = []; // Array to store unchecked item names

  checkedCount = 0;
  uncheckedCount = this.items.length;

 
  
  itemNames =this.dataService.inspector_names;

  updateTotals() {


    this.checkedCount = this.items.filter(item => item.checked).length;
    this.uncheckedCount = this.items.length - this.checkedCount;
    this.dataService.setCheckedCount(this.checkedCount);
    this.dataService.unCheckedCount=this.uncheckedCount;
    this.dataService.total_items=this.itemNames;
    this.checkedItems1 = this.items.filter(item => item.checked).map(item => ({ name: item.name, headChecked: item.headChecked, fromDate: item.fromDate, toDate: item.toDate, i_approved:0,i_rejected:0 }));
    this.checkedItems = this.items .filter(item => item.checked) // Filter items where checked is true
    .map(item => item.name); 

    this.dataService.inspector_array=this.checkedItems1;


    console.log('verify filtered array',this.checkedItems1);
    


    this.dataService.inspector_list = this.checkedItems;

    
    this.dataService.inspector_list=this.checkedItems;
    this.dataService.total_checked_items=this.checkedItems;
    this.uncheckedItems = this.items.filter(item => !item.checked).map(item => item.name);
    this.dataService.total_unchecked_items=this.uncheckedItems;
  }
  constructor(private dataService:ApicallService) {


  }

  ngOnInit() {
 
   this.items = this.itemNames.map(name => ({ name, checked: false,headChecked:false,fromDate:new Date(),toDate:new Date() }));

  }

  printItems() {
    
    this.updateTotals();
    
    
    
    }

  
  // items: { name: string, checked: boolean }[] = [];
  // checkedItems: string[] = []; // Array to store checked item names
  // uncheckedItems: string[] = []; // Array to store unchecked item names

  // checkedCount = 0;
  // uncheckedCount = this.items.length;

 
 

  // itemNames =this.dataService.inspector_names;

  // updateTotals() {
   

  //   // Update the checkedItems and uncheckedItems arrays
  //   this.checkedItems = this.items.filter(item => item.checked).map(item => item.name);
  //   this.dataService.inspector_list=this.checkedItems;
   
  // }
  // constructor(private dataService:DataService) {


  // }

  // ngOnInit() {
 
  //  this.items = this.itemNames.map(name => ({name, checked: false}));

  //   this.updateTotals();
  //   this.printItems();
  // }

  // printItems() {
  //   console.log('Checked Items:', this.checkedItems);
  //   console.log('Unchecked Items:', this.uncheckedItems);
  //   console.log('checked count:',this.checkedCount);
  //   console.log('unchecked count:',this.uncheckedCount);
    
    
  // }





  
}
