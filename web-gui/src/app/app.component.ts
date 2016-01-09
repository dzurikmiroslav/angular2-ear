import {Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';


@Component({
  selector: 'app',
  template: `
    <div>
      <p>Some REST stuff: <em>{{stuff}}</em></p>
      <button type="submit" class="btn btn-success" (click)="fetchStuff()">Call REST</button>
    </div>
  `
})
export class AppComponent {
  public stuff: string;
  private http: Http;
  constructor(http: Http) {
    this.http = http;
  }
  fetchStuff() {
    this.http.get('/web-service/rest/stuff').subscribe(res => { this.stuff = res.text(); });
  }
}
