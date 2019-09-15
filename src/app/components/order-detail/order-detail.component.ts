import { Component, OnInit, Inject, AfterContentInit } from '@angular/core';
import { Order } from '../../models/order';
import { menuItem } from '../../models/menuItem';
import { DataService } from '../../services/data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router, NavigationExtras }     from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, Observable, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSlideToggleChange } from '@angular/material';

export interface DialogData {
  id: string;
  name: string;
  price: number;
  qty: number;
  discount: number;
}

@Component({
  selector: 'order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, AfterContentInit {
  menulist : menuItem[] = [];
  filteredMenulist : menuItem[] = [];
  selectedMenu : menuItem[] = [];
  displayedColumns = ['add','name', 'price', 'qty', 'discount'];
  subscription: Subscription;

  orderDate: string = new Date().toLocaleString();
  orderNo: string = '1';
  orderId: string;
  orderSum: number = 0.0;
  orderDiscount: number = 0.0;
  orderDiscountSum: number = 0.0;
  orderIsDone: boolean;
  orderSumToPay: number = 1.0;
  orderSumService: number = 1.0;
  orderGuests: number = 1;
  newData: any;
  printTime: string = '';
  place: string = '';
  printed: string = '';
  waiter: string = '';
  buttonState: boolean;
  done: boolean;
  doneInfo: string;

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router,
    private firestore: AngularFirestore, public dialog: MatDialog, private _snackBar: MatSnackBar) {
  }
  
  ngOnInit() {
    this.dataService.getMenuList().subscribe(actionArray => {
      this.menulist = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as menuItem;
      })
    });
    // Capture the order ID if available
    this.route.queryParams.subscribe(params => {
      this.orderId = params["orderid"];
    });
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  onSave() {
    //update existing document
    if (this.orderId) {
      if (this.selectedMenu) this.caclSumOrder();
      this.firestore.collection('orders').doc(this.orderId).update({
        //id: this.orderId,
        OrderDate: this.orderDate, 
        TableNo: this.orderNo,
        sumOrder: this.orderSum,
        discountOrder: this.orderDiscount,
        sumDiscount: this.orderDiscountSum,
        sumService: this.orderSumService,
        sumToPay: this.orderSumToPay,
        orderGuests: this.orderGuests,
        printTime: this.printTime,
        place: this.place,
        printed: this.printed,
        waiter: this.waiter
        //isDone: true, this.orderSumToPay = this.orderSumService;
      });
      this.storeOrderItems(this.orderId);
      this.dataService.openSnackBar('Создание зказа...', 'завершено!');
    //this.firestore.collection('orders').doc(this.orderId).collection('lines')
    } else {
      //add new document
      let res = this.firestore.collection('orders').add({
        OrderDate: this.orderDate, 
        TableNo: this.orderNo,
        sumOrder: this.orderSum,
        discountOrder: this.orderDiscount,
        sumDiscount: this.orderDiscountSum,
        sumService: this.orderSumService,
        sumToPay: this.orderSumToPay        
        //isDone: true,
      }).then(
        (w) => {
          this.orderId = w.id;
          this.storeOrderItems(w.id);
          //console.log(w.id)
          }
      )
      //this.storeOrderItems(this.orderId);
    }
  }

  caclSumOrder() {
      this.orderSum = 0.0;
      let ssum: number = 0.0;
      this.selectedMenu.forEach(
        item => {
          ssum += Math.round(item.price * item.qty);
        }
      )
      this.orderSum = ssum;
      this.orderDiscountSum = Math.round(this.orderSum * (this.orderDiscount /100.0));
      this.orderSumToPay = (this.orderSum - this.orderDiscountSum + this.orderSumService) * 1;
  }

  ngAfterContentInit() {
    if (this.orderId) {
      this.getOrderItems2();
      this.fillOrderData();
    } 
  }

  printForm() {
    this.dataService.changeStatePrnButton(true);
    let navigationExtras: NavigationExtras = { queryParams: 
      { selectedMenu: JSON.stringify(this.selectedMenu), 
        orderSumToPay: this.orderSumToPay.toFixed(2),
        orderDate: this.orderDate,
        orderNo: this.orderNo,
        orderGuests: this.orderGuests,
        printTime: this.printTime,
        place: this.place,
        printed: this.printed,
        waiter: this.waiter
      },
    };
    this.router.navigate(['/print-form'], navigationExtras);
    //this.router.navigateByUrl('/print-form', navigationExtras);
  }

  storeOrderItems(id: string) {
    //clear data in subcollection
    //console.log(this.selectedMenu)
    //this.firestore.collection('orders').doc(id).collection('lines').get().toPromise().then(
    //  query => { console.log(query.size);
    //    if (query.size > 0) {
          this.firestore.collection('orders').doc(id).collection('lines').get().toPromise().then(
          snapshot => {snapshot.forEach( d => {
           //.docs.forEach( d => {
              d.ref.delete()
            }
          )}
        )
     // }
    //})
    //console.log(this.selectedMenu)
    //add item to subcollection
    let i=1;
    this.selectedMenu.forEach(
      item => {
        //console.log(item);
        this.firestore.collection('orders').doc(id).collection('lines').add({
          line_no: i,
          name: item.name,
          price: item.price,
          qty: item.qty,
          discount: item.discount
        })
        i++;
      }
    )

  }

  getOrderItems2() {
      if (this.orderId) {
      this.dataService.getSubCollection(this.orderId).subscribe(actionArray => {
        this.selectedMenu = actionArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as menuItem;
        });
      });
    }
  }

  fillOrderData() {
    if (this.orderId) {
        //let docRef = this.firestore.collection('orders').doc(this.orderId);
        this.dataService.getOrder(this.orderId).get().toPromise().then(
          doc => {//console.log("Document data:", doc.data())
            //this.orderId = this.orderId;
            this.orderNo = doc.data().TableNo;
            this.orderDate = doc.data().OrderDate;
            this.orderIsDone = doc.data().isDone;
            this.orderSum = doc.data().sumOrder;
            this.orderDiscount = doc.data().discountOrder;
            this.orderDiscountSum = doc.data().sumDiscount;
            this.orderSumService = doc.data().sumService;
            this.orderSumToPay = doc.data().sumToPay;
            this.orderGuests = doc.data().guests;
            this.printTime = doc.data().printTime;
            this.place = doc.data().place;
            this.printed = doc.data().printed;
            this.waiter = doc.data().waiter;
            this.done = doc.data().isDone;
            this.doneInfo = this.done ? 'Закрыт': 'Открыт'
          }
        )
      }
  }

  onAdd(item: menuItem) {
    this.selectedMenu.push(item);
    //console.log(this.selectedMenu)
  }

  onDelete(id: string) {
    //console.log(id, this.selectedMenu)
    for(let i = 0; i < this.selectedMenu.length; i++) {
      if(this.selectedMenu[i].id == id) {
        this.selectedMenu.splice(i, 1);
      }
    }
  }

  applyFilter(filterValue: string) {
    //this.orderId.pipe(map(m => console.log(m)))
    this.filteredMenulist = this.menulist.filter(v => v.name.toLowerCase().startsWith(filterValue.trim().toLowerCase()));
  }

  openDialog(item: menuItem): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {id: item.id, name: item.name, price: item.price, qty: item.qty, discount: item.discount}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      if (result) {
        this.newData = result;
        //console.log(this.newData);
        for(let i = 0; i < this.selectedMenu.length; i++) {
          if(this.selectedMenu[i].id == this.newData.id) {
            this.selectedMenu[i].price = this.newData.price;
            this.selectedMenu[i].qty = this.newData.qty;
            this.selectedMenu[i].discount = this.newData.discount;
          }
        }
      }
    });
  }

  public toggle(event: MatSlideToggleChange) {
    //console.log('toggle', event.checked);
    this.dataService.changeDoneStatus(this.orderId, event.checked);
    switch (this.doneInfo ) {
      case 'Закрыт':
        this.doneInfo = 'Открыт';
        break;
      case 'Открыт':
        this.doneInfo = 'Закрыт';
        break;    
      default:
        this.doneInfo = 'Закрыт';
        break;
    }
    //this.useDefault = event.checked;
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './edit-dialog.html',
  styleUrls: ['./edit-dialog.css']
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}