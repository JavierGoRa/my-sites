import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
//import { DbProvider } from '../../providers/db/db';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';

/**
 * Generated class for the ModalNuevoSitioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-nuevo-sitio',
  templateUrl: 'modal-nuevo-sitio.html',
})
export class ModalNuevoSitioPage {

  coords : any = { latitude: 0, longitude: 0 }
  foto: any = '';
  description: string = '';
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl : ModalController,
    private camera: Camera,
    //private db: DbProvider,
    private viewCtrl : ViewController,
    private dbFirebase :FirebaseDbProvider,
    ) {

    this.coords.latitude = this.navParams.get('latitude');
    this.coords.longitude = this.navParams.get('longitude');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalNuevoSitioPage');
    this.coords.latitude = this.navParams.get('latitude');
    this.coords.longitude = this.navParams.get('longitude');
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

    console.log(cameraOptions);
    
     this.camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is a base64 encoded string
        this.foto = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    }); 
  }
  
  cerrarModal(){
    this.viewCtrl.dismiss();
  }

  guardarSitio(){
    let sitio = {
      latitude: this.coords.latitude,
      longitude: this.coords.longitude ,
      description: this.description,
      foto: this.foto
    }
    this.dbFirebase.guardaSitio(sitio).then(res=>{
      console.log('Sitio guardado en firebase:');
      this.cerrarModal();
    })
  }

  
  

}
