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
import { MatExpansionModule } from '@angular/material/expansion';

import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';

import { environment } from '../environments/environment';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireFunctionsModule } from '@angular/fire/functions';

import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

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
import { SigninComponent } from './components/signin/signin.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [ 
    AppComponent,
    OrderDetailComponent, DialogOverviewExampleDialog,
    MenuListComponent, OrderListComponent, MenuItemCreateComponent,
    OrderCreateComponent,
    PrintFormComponent,
    SnackBarComponent,
    TestPageComponent,
    SigninComponent,
    UserProfileComponent
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
    MatListModule, MatExpansionModule,
    HttpClientModule,
        // Specify the ngx-auth-firebaseui library as an import
        NgxAuthFirebaseUIModule.forRoot(
          environment.firebaseConfig,
          () => 'your_app_name_factory',
          {
            enableFirestoreSync: true, // enable/disable autosync users with firestore
            toastMessageOnAuthSuccess: false, // whether to open/show a snackbar message on auth success - default : true
            toastMessageOnAuthError: false, // whether to open/show a snackbar message on auth error - default : true
            authGuardFallbackURL: '/signin', // url for unauthenticated users - to use in combination with canActivate feature on a route
            authGuardLoggedInURL: '/order-list', // url for authenticated users - to use in combination with canActivate feature on a route
            passwordMaxLength: 60, // `min/max` input parameters in components should be within this range.
            passwordMinLength: 4, // Password length min/max in forms independently of each componenet min/max.
            // Same as password but for the name
            nameMaxLength: 50,
            nameMinLength: 2,
            // If set, sign-in/up form is not available until email has been verified.
            // Plus protected routes are still protected even though user is connected.
            guardProtectedRoutesUntilEmailIsVerified: false,
            enableEmailVerification: false, // default: true
          })
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


