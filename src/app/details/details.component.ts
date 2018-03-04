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

  constructor(private route: ActivatedRoute, private _sanitizer: DomSanitizer, private _dataService: DataService) { }

  drummer: Observable<{}>;
  drummerId: string;
  drummerShows: string;

  //Here we got an infinite observable
  //and i'm interesting about fetching shows_url field from it.
  drummerSubscribed = { 
    next: function(value) {
      console.log(value.shows_url);
      this.drummerShows = value.shows_url;
    },
    error: function(value) {
      console.log(value);
    },
    complete: function(value) {
      console.log(value);
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.drummerId = params['id'];
    });
    this.drummer = this.getAsyncData().pipe(share());
    this.drummer = this.showDrummerDetails(this.drummerId);
    this.retrievingShowsUrl();    
  }
  
  getAsyncData() {
     // Fake Slow Async Data
    return of({
      name: 'Luke',
      image_url: 'Skywalker',
      shows_url: 'John Williams',
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

  retrievingShowsUrl(){
    this.drummer.subscribe(this.drummerSubscribed.next);
    }

    //cannot sanitize it the right way

}