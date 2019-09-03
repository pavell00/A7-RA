import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute }     from '@angular/router';
import { menuItem } from '../../models/menuItem';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'print-form',
  templateUrl: './print-form.component.html',
  styleUrls: ['./print-form.component.css']
})
export class PrintFormComponent implements OnInit {
  selectedMenu: menuItem[] = [];;
  orderSum: number;
  orderDate: string;
  orderNo: string;
  orderGuests: number;
  place: string;
  printed: string;
  waiter: string = '';
  printTime: string = '';
  

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedMenu = JSON.parse(params['selectedMenu']);
      this.orderSum =  params['orderSum'];
      this.orderDate = params['orderDate'];
      this.orderNo = params['orderNo'];
      this.orderGuests = params['orderGuests'];
      this.place = params['place'];
      this.printed = params['printed'];
      this.waiter = params['waiter'];
      this.printTime = params['printTime'];
      //this.tableheader = params['tableheader'];
    });
    /*this.dataService.getParams().get().toPromise().then(
      param => {//console.log("params data:", doc.data())
        this.tableheader = param.data().tableHeader1;
      })*/
  }

  print() {
    //console.log(JSON.stringify(this.selectedMenu))
    //console.log(JSON.stringify(this.sub))
    window.print();
  }

}
