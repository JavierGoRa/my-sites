import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthProvider } from '../auth/auth';

/*
  Generated class for the FirebaseDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class FirebaseDbProvider {

  constructor(public afDB: AngularFireDatabase, public auth: AuthProvider) {
    console.log('Hello FirebaseDbProvider Provider');
  }

  guardaSitio(sitio){
    if(!sitio.id){
      sitio.id  = Date.now();
    }
    return this.afDB.database.ref('sitios/'+this.auth.getUser()+'/'+sitio.id).set(sitio)
  }

  getSitios(){
    return this.afDB.list('sitios/'+this.auth.getUser()).valueChanges();
  }

  public borrarSitio(id){
    this.afDB.database.ref('sitios/'+this.auth.getUser()+'/'+id).remove();
  }

}
