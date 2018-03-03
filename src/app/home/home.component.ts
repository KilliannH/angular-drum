import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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

}
