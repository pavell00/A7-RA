import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Order } from '../../models/order';
import { MatTable, MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {
  //displayedColumns: string[] = [];
  //columnsToDisplay: string[] = [];
  orders: Order[] = [];
  tmp: any

  //@ViewChild(MatTable, {static:false}) table: MatTable<any>;
  //dataSource :any;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    //this.displayedColumns = ['TableNo','OrderDate','sumOrder','discountOrder','Actions'];
    //this.columnsToDisplay = this.displayedColumns.slice();
    this.dataService.getOrders().subscribe(actionArray => {
      this.orders = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Order
        } //as Order;
      })
    }); 
  }

  ngAfterViewInit() {

    //this.table.dataSource = this.dataSource;
  }
  ngAfterContentChecked(){
    //this.dataSource = new MatTableDataSource (this.orders);
  } 

}
