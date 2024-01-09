import { Component,OnInit} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ApicallService } from 'src/app/apicall.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private dataService:ApicallService) {


  }

  isChecked = false;
  
  items: { name: string, checked: boolean }[] = [];
  checkedItems: string[] = []; // Array to store checked item names
  uncheckedItems: string[] = []; // Array to store unchecked item names

  checkedCount = 0;
  uncheckedCount = this.items.length;

  // elevator=this.dataService.elevator_names;
  // home=this.dataService.home_names;
  // dumb=this.dataService.dump_names;
  // car_parking=this.dataService.car_parking_values;
  // escalator=this.dataService.escalator_values;
  // moving_walk=this.dataService.moving_walk_values;
  // travelator=this.dataService.travelator_values;

  //standard elevators
  elevator_json =JSON.parse(this.dataService.selectedDetails.elevator_values);
  elevatorNames: string[] = this.elevator_json.elevator_names;
  elevatorStops: number[] = this.elevator_json.elevator_stops;
  elevator: string[] = this.elevatorNames.map((name, index) => name+' -' + ' (' + this.elevatorStops[index]+')');

  //home elevator values
  home_json =JSON.parse(this.dataService.selectedDetails.home_elevator_values);
  homeNames:string[]=this.home_json.home_names;
  homeStops:number[]=this.home_json.home_stops;
  home=this.homeNames.map((name,index)=> name+' -'+' ('+this.homeStops[index]+')' );


  //dumb elevator values
  dumb_json =JSON.parse(this.dataService.selectedDetails.dump_values);
  dumbNames:string[]=this.dumb_json.dump_names;
  dumbStops:string[]=this.dumb_json.dump_stops;
  dumb=this.dumbNames.map((name,index)=>name+' -'+' ('+this.dumbStops[index]+')');
//car parking
car_json =JSON.parse(this.dataService.selectedDetails.car_parking_values);
car_parking=this.car_json;

//escalator 
escalator_json =JSON.parse(this.dataService.selectedDetails.escalator_values);
escalator=this.escalator_json;


//moving walk names
mw_json =JSON.parse(this.dataService.selectedDetails.mw_values);
moving_walk=this.mw_json;


  travelator=this.dataService.travelator_values;

  itemNames = [...this.elevator,...this.home,...this.dumb,...this.car_parking,...this.escalator,...this.moving_walk,...this.travelator];

  updateTotals() {
    this.checkedCount = this.items.filter(item => item.checked).length;
    this.uncheckedCount = this.items.length - this.checkedCount;
    this.dataService.setCheckedCount(this.checkedCount);
    this.dataService.unCheckedCount=this.uncheckedCount;
    this.dataService.total_items=this.itemNames;

    // Update the checkedItems and uncheckedItems arrays
    this.checkedItems = this.items.filter(item => item.checked).map(item => item.name);
    this.dataService.total_checked_items=this.checkedItems;
    this.uncheckedItems = this.items.filter(item => !item.checked).map(item => item.name);
    this.dataService.total_unchecked_items=this.uncheckedItems;
  }
  

  ngOnInit() {
 
   this.items = this.itemNames.map(name => ({ name, checked: false }));

    this.updateTotals();
    this.printItems();
  }

  printItems() {
    console.log('Checked Items:', this.checkedItems);
    console.log('Unchecked Items:', this.uncheckedItems);
    console.log('checked count:',this.checkedCount);
    console.log('unchecked count:',this.uncheckedCount);
    
    
  }

  // itemNames = ['p1', 'p2', 'p3', 's1', 's2'];
  // items: { name: string, checked: boolean }[] = [];
  // checkedItems: string[] = []; // Array to store checked item names
  // uncheckedItems: string[] = []; // Array to store unchecked item names

  // checkedCount = 0;
  // uncheckedCount = this.items.length;

  // ngOnInit() {
  //   // Initialize the items array based on itemNames
  //   this.items = this.itemNames.map(name => ({ name, checked: false }));
  //   this.updateTotals();
  //   this.printItems();
  // }

  // updateTotals() {
  //   this.checkedCount = this.items.filter(item => item.checked).length;
  //   this.uncheckedCount = this.items.length - this.checkedCount;

  //   // Update the checkedItems and uncheckedItems arrays
  //   this.checkedItems = this.items.filter(item => item.checked).map(item => item.name);
  //   this.uncheckedItems = this.items.filter(item => !item.checked).map(item => item.name);
  // }
  // printItems() {
  //   console.log('Checked Items:', this.checkedItems);
  //   console.log('Unchecked Items:', this.uncheckedItems);
  // }
  

}
