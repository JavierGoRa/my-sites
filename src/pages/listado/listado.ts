import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { AlertController } from 'ionic-angular';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';

/**
 * Generated class for the ListadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listado',
  templateUrl: 'listado.html',
})
export class ListadoPage {
  sitios: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl : ModalController, 
    public db : DbProvider,
    public alertCtrl : AlertController,
    public dbFirebase :FirebaseDbProvider,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListadoPage');
  }

  ionViewDidEnter(){
    this.dbFirebase.getSitios().subscribe(sitios=>{
      this.sitios = sitios;
    })
  }

  muestraSitio(sitio){
    let modalSitio = this.modalCtrl.create( 'ModalDetalleSitioPage', sitio );
    modalSitio.present();
  }

  borrarSitio(id){

    let alert = this.alertCtrl.create({
      title: 'Confirmar borrado',
      message: '¿Estás seguro de que deseas eliminar este sitio?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            // Ha respondido que no así que no hacemos nada
          }
        },
        {
          text: 'Si',
          handler: () => {
            // AquÍ borramos el sitio en firebase
            this.dbFirebase.borrarSitio(id);
           }
        }
      ]
    });

    alert.present();

 }

}
