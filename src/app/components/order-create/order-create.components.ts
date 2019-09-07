import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../../models/order';

@Component({
    selector: 'order-create',
    templateUrl: './order-create.components.html',
    styleUrls: ['./order-create.components.css']
})
export class OrderCreateComponent implements OnInit {
    newOrder: Order;
    orderDate: string = new Date().toLocaleString('ru');
    orderNo: string = '№ 1';
    orderSum: number = 0;
    orderDiscount: number = 0;
    orderIsDone: boolean = false;
    orderGuests: number = 1;
    orderPrintTime: string = '00:00';
    orderCheck: number = 1;
    orderSumService: number = 0;
    place: string = 'Зал';
    waiter: string = 'Кулешов Андрей';
    printed: string= 'Кулешов Андрей';

    constructor(private dataService: DataService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

    ngOnInit(): void {
      let d = new Date();
      let dd: string = (d.getDay() + 1).toString();
      let mm: string = (d.getMonth() + 1).toString();
      if (mm.length == 1) {mm = '0'+mm;}
      if (dd.length == 1) {dd = '0'+dd;}
      let date: string = dd+'/'+mm+' '+d.getHours()+':'+d.getMinutes();
      this.orderDate = date;
    }

    onSave() {
      //add new document
        let res = this.firestore.collection('orders').add({
        OrderDate: this.orderDate, 
        TableNo: this.orderNo,
        sumOrder: this.orderSum,
        discountOrder: this.orderDiscount,
        sumService: this.orderSumService,
        isDone: false,
        guests: this.orderGuests,
        check: this.orderCheck,
        printTime: this.orderPrintTime,
        place: this.place,
        printed: this.printed,
        waiter: this.waiter
      }).then(
        (w) => {
          //this.orderId = w.id;
          //this.storeOrderItems(w.id);
          //console.log(w.id)
          this.toastr.success('Заказ создан', 'EMP. Register');
          }
      )
    }
}