import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private statePrintButton = new BehaviorSubject<boolean>(false);
  isShowPRNButton = this.statePrintButton.asObservable();
  //public formData: menuItem;
  constructor(private firestore: AngularFirestore, private _snackBar: MatSnackBar,
    private fns: AngularFireFunctions) { }

  deleteOrder_cfn(id: string): Observable<string> {
    const docid = { docid: id };
    return this.fns.httpsCallable('del_order')(docid)
  }

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
    this.firestore.collection('orders').doc(id).collection('lines').get()
    .toPromise().then(
      snapshot => {snapshot.forEach( item => {
         item.ref.delete()
         }
       ),
       this.firestore.collection('orders').doc(id).delete(),
       this.openSnackBar('Удаление заказа...', 'завершено!')
      }
    )

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