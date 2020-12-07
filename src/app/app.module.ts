import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';

import { MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import {MatOptionModule} from '@angular/material/';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';

import { environment } from '../environments/environment';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireFunctionsModule } from '@angular/fire/functions';

import { DataService } from './services/data.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderDetailComponent, DialogOverviewExampleDialog } from './components/order-detail/order-detail.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { OrderListComponent } from './components/orders-list/orders-list.component';
import { MenuItemCreateComponent } from './components/menuItem-create/menuItem-create.component';
import { OrderCreateComponent } from './components/order-create/order-create.components';
import { PrintFormComponent } from './components/print-form/print-form.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { TestPageComponent } from './components/test-page/test-page.component';

@NgModule({
  declarations: [ 
    AppComponent,
    OrderDetailComponent, DialogOverviewExampleDialog,
    MenuListComponent, OrderListComponent, MenuItemCreateComponent,
    OrderCreateComponent,
    PrintFormComponent,
    SnackBarComponent,
    TestPageComponent
    ],
  imports:      [ 
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatListModule, MatIconModule, MatSnackBarModule, MatSlideToggleModule,
    MatIconModule, MatButtonModule, MatSnackBarModule, 
    MatFormFieldModule, MatTableModule, MatDialogModule,
    MatInputModule, //MatOptionModule, 
    MatSelectModule, MatCheckboxModule,
    MatListModule,
     HttpClientModule
    ],
  providers: [DataService, 
    { provide: MatDialogRef, useValue: {close: (dialogResult: any) => { }}},
    { provide: MAT_DIALOG_DATA, useValue: [] }
  ],
  exports: [AppRoutingModule],
  entryComponents: [DialogOverviewExampleDialog],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }


