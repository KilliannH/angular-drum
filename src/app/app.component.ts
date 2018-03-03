import { Component } from '@angular/core';
import { DataService } from './data.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  drummers:Array<any>

  warnRegister: boolean = false;

  ngOnInit() {
  this.showDrummers();
  }

  constructor(private _dataService: DataService) { }

    showDrummers(){
      return this._dataService.getDrummers().subscribe(
        res => this.drummers = res);
  }

  warnHim(){
    this.warnRegister = true;
  }

  hideWarnMessage(){
    this.warnRegister = false;
  }

  clearThem(){
    this.drummers = null;
  }

}
