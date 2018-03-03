import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

//This particular stuff is to avoid errors with async data
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { delay, share } from 'rxjs/operators';

//for embed video
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private _dataService: DataService) { }

  drummer: Observable<{}>;
  drummerId: string;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.drummerId = params['id'];
    });
    this.drummer = this.getAsyncData().pipe(share());
    this.drummer = this.showDrummerDetails(this.drummerId);
  }
  
  getAsyncData() {
     // Fake Slow Async Data
    return of({
      name: 'Luke',
      image_url: 'Skywalker',
      description: 'bla',
      brand: 'salut',
      bands: 'ça va'
    }).pipe(
      delay(2000)
    );
  }

  showDrummerDetails(id: string) {
    return this._dataService.getDrummersById(id);
  }

  showThatObservable(){
    this.drummer.subscribe(res =>
       console.log(res));
    }

}