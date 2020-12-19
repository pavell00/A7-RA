import { Component, OnInit } from '@angular/core';
import { version } from '../../package.json';
import { DataService } from './services/data.service';
import { AuthProvider, Theme, AuthProcessService } from 'ngx-auth-firebaseui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'A7RA CAN';
  public version: string = version;
  public isShowPRN: boolean ;

  constructor(private dataService: DataService, public auth: AuthProcessService) { }

  ngOnInit() {
    this.dataService.isShowPRNButton.subscribe( res => {this.isShowPRN = res;} )
  }

  print() {
    this.dataService.changeStatePrnButton(false);
    window.print();
  }

}