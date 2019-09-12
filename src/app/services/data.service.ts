import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Order } from '../models/order';
import { menuItem } from '../models/menuItem';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { distinct, flatMap, map, take, max} from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private statePrintButton = new BehaviorSubject<boolean>(false);
  isShowPRNButton = this.statePrintButton.asObservable();
  //public formData: menuItem;
  constructor(private firestore: AngularFirestore) { }

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

  showPrinButton() {

  }

}