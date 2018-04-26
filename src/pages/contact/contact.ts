import { Component, ElementRef, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';

declare var google: any;


@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})
export class ContactPage {


    @ViewChild('mapCanvas') mapElement: ElementRef;

    constructor(public platform: Platform) {
        if ('geolocation' in navigator) {
            navigator.geolocation.watchPosition((location) => {
                    this.showMap(location);
                }
            );
        }
    }

    public showMap(location) {
        console.log(location.coords)
        var mapPoint = {
            name: "It's ME!!",
            lat: location.coords.latitude,
            lng: location.coords.longitude
        };

        let mapEle = this.mapElement.nativeElement;

        let map = new google.maps.Map(mapEle, {
            center: mapPoint,
            zoom: 16
        });

        let infoWindow = new google.maps.InfoWindow({
            content: `<h5>Hello, I'm here!</h5>`
        });

        let marker = new google.maps.Marker({
            position: mapPoint,
            map: map,
            title: mapPoint.name
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });

        google.maps.event.addListenerOnce(map, 'idle', () => {
            mapEle.classList.add('show-map');
        });
    }


}
