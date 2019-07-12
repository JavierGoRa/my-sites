import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController  } from 'ionic-angular';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Camera, CameraOptions } from '@ionic-native/camera';
//import { DbProvider } from '../../providers/db/db';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';


/**
 * Generated class for the ModalDetalleSitioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-detalle-sitio',
  templateUrl: 'modal-detalle-sitio.html',
})
export class ModalDetalleSitioPage {

  sitio: any;
  edit : boolean = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private viewCtrl : ViewController, 
    private launchNavigator : LaunchNavigator, 
    private camera: Camera, 
    //private db: DbProvider
    private dbFirebase :FirebaseDbProvider

    ) {
    this.sitio = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalDetalleSitioPage');
  }

  cerrarModal(){
    this.viewCtrl.dismiss();
  }

  comoLlegar(){
    let destino = this.sitio.latitude+', '+this.sitio.longitude;
    this.launchNavigator.navigate(destino)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }

  editar(){
    this.edit = true;
  }

  sacarFoto(){

    let cameraOptions : CameraOptions = {
        quality: 50,
        encodingType: this.camera.EncodingType.JPEG,
        targetWidth: 800,
        targetHeight: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        correctOrientation: true
    }


    this.camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is a base64 encoded string
        this.sitio.foto = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }

  guardarCambios(){

    let sitio = {
     id : this.sitio.id,
     latitude: this.sitio.latitude,
     longitude: this.sitio.longitude ,
     description: this.sitio.description,
     foto: this.sitio.foto
   }

   this.dbFirebase.guardaSitio(sitio).then(res=>{
       this.cerrarModal();
   })
  }

}
