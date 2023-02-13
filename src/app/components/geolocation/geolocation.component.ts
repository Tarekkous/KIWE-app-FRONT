import { Component } from '@angular/core';
import {  Router } from '@angular/router';
declare const L: any;
@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.scss'],
})
export class GeolocationComponent {
  constructor(private _router:Router) {}

  ngOnInit(): void {
    if (!navigator.geolocation) {
      console.log('location is not supported!');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude]
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
      let map = L.map('map').setView(latLong, 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      var marker = L.marker(latLong).addTo(map);
      marker.bindPopup('<b>Ta position</b>').openPopup()

    });
    this.watchPosition();
  }

  //! on met à jour la localisation à chaque mouvement et chaque timeout
  watchPosition() {
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition(
      (position) => {
        console.log(
          `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
        );
        if (position.coords.latitude === desLat) {
          navigator.geolocation.clearWatch(id);
        }
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };



  goBack(){
    this._router.navigate(['/overview/home']);
  };

};
