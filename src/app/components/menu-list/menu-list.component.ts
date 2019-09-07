import { Component, OnInit } from '@angular/core';
import { menuItem } from '../../models/menuItem';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  menulist : menuItem[] = [];
  displayedColumns = ['name', 'price', 'qty', 'discount', 'Del'];
  
  constructor(private dataService: DataService, private router : Router,
    private firestore: AngularFirestore,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataService.getMenuList().subscribe(actionArray => {
      this.menulist = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as menuItem;
      })
    });
  }

  createMenuItem() {
    //menuItem-create
    this.router.navigateByUrl('menuItem-create');
  }

  onDelete(id: string) {
    if (confirm("вы уверенны что хотите удалить запись?")) {
      this.firestore.doc('menulist/' + id).delete();
      this.openSnackBar();
    }
  }

  openSnackBar() {
    this._snackBar.open('Сохраниение зказа...', 'завершено!', {duration: 1000, verticalPosition: 'top'})
  }

}