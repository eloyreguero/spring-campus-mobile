import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiServiceProvider } from "../../providers/api-service/api-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public shows: any[];

  constructor(public navCtrl: NavController, public apiService: ApiServiceProvider) {
    this.loadShows();
  }

  private loadShows() {
      this.apiService.getShows().subscribe(result =>
          {
              console.log(result);
              this.shows = result;
          }
      )
  }

}
