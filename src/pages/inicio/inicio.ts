import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import leaflet from 'leaflet';

/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  coords: any = { latitude: 0, longitude: 0 };

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl : ModalController) {
  }

  ionViewDidEnter() {
    this.loadmap();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
  }

  loadmap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'www.tphangout.com',
      maxZoom: 18
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      this.coords.latitude = e.latitude ;
      this.coords.longitude = e.longitude ;
      let markerGroup = leaflet.featureGroup();
      var myIcon = leaflet.icon({
        iconUrl: 'assets/imgs/icon.png',
        iconSize: [95, 95],
        iconAnchor: [47, 85],
        popupAnchor: [-3, -76]
      });
      let marker: any = leaflet.marker([e.latitude, e.longitude], {icon: myIcon}).on('click', () => {
        alert("Estas en" + "\n" + "Latitud: " + e.latitude + "\n" + "Longitud: " + e.longitude);
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      }).on('locationerror', (err) => {
        alert(err.message);
      })


  }
  nuevoSitio(){
    let mimodal = this.modalCtrl.create( 'ModalNuevoSitioPage',this.coords
    );
    console.log(mimodal);
    mimodal.present();
  }

}
