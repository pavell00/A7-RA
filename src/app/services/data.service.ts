import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private statePrintButton = new BehaviorSubject<boolean>(false);
  isShowPRNButton = this.statePrintButton.asObservable();
  //public formData: menuItem;
  constructor(private firestore: AngularFirestore, private _snackBar: MatSnackBar) { }

  changeStatePrnButton(res: boolean) {
    this.statePrintButton.next(res);
  }

  getMenuList() {
    return this.firestore.collection('menulist').snapshotChanges();
  }

  getOrders() {
    return this.firestore.collection('orders').snapshotChanges();
  }

  getParams() {
    return this.firestore.collection('prgparams').doc('2');
  }

  getSubCollection(id: string) {
    return this.firestore.collection('orders').doc(id).collection("lines").snapshotChanges();
  }
  
  getOrder(id: string) {
    //return this.firestore.collection('orders').doc(id).snapshotChanges();
    return this.firestore.collection('orders').doc(id);
  }

  deleteOrder(id: string) {
    //this.firestore.collection('orders').doc(id).ref.collection('lines').parent.delete();
    //this.firestore.collection('orders').doc(id).delete();
  }

  async changeDoneStatus (id: string, status: boolean) {
    var docRef = this.firestore.collection("orders").doc(id);
    try {
      await docRef.update({
        isDone: status
      });
      let prefix: string;
      if (status) {
        prefix = 'Закрытие заказа...';
      }
      else {
        prefix = 'Открытие заказа...';
      }
      this.openSnackBar(prefix, 'завершено...');
    }
    catch (error) {
      console.error("Error updating document: ", error);
    }

  }

  openSnackBar(title: string, msg: string) {
    this._snackBar.open(title, msg, 
      {duration: 1000, verticalPosition: 'top'})
  }

}