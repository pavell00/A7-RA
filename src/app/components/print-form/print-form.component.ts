import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute }     from '@angular/router';
import { menuItem } from '../../models/menuItem';

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

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedMenu = JSON.parse(params['selectedMenu']);
      this.orderSum =  params['orderSum'];
      this.orderDate = params['orderDate'];
      this.orderNo = params['orderNo'];
    });
    //this.sub = this.route.snapshot.queryParamMap.get('selectedMenu');
  }

  getMenu() {
    //console.log(JSON.stringify(this.selectedMenu))
    //console.log(JSON.stringify(this.sub))
  }

}
