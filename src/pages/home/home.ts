import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiServiceProvider } from "../../providers/api-service/api-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    public allShows: any[];
    public visibleShows: any[];

    constructor(public navCtrl: NavController, public apiService: ApiServiceProvider) {
        this.loadShows();
    }

    private loadShows() {
        this.apiService.getShows().subscribe(result => {
                this.allShows = result;
                this.visibleShows = this.allShows.splice(0, 20);
            }
        )
    }

    public loadMoreData(infiniteScroll) {
        setTimeout(() => {
            var total = this.visibleShows.length;
            for (let i = 0; i < 50; i++) {
                var idx = total + i;
                if (this.allShows[idx]) {
                    this.visibleShows.push(this.allShows[idx]);
                }
            }
            infiniteScroll.complete();
        }, 500);

    }

    public doRefresh(refresher) {
        setTimeout(() => {
            this.visibleShows = this.allShows.slice(0, 20)
            refresher.complete();
        }, 2000);

  }

}
