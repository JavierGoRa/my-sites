import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbProvider {

  db : SQLiteObject = null;
  constructor(public sqlite: SQLite) {
    console.log('Hello Db Provider');
  }

  //crea y abre la base de datos
  public openDb(){
    return this.sqlite.create({
        name: 'data.db',
        location: 'default' // campo obligatorio
    })
    .then((db: SQLiteObject) => {
     this.db =db;
   })
  }

  //crea la tabla donde se guardarán los lugares
  public createTableSitios(){
    return this.db.executeSql("create table if not exists sitios( id INTEGER PRIMARY KEY AUTOINCREMENT, latitude FLOAT, longitude FLOAT, coords TEXT, description TEXT, foto TEXT )",[])
  }

  //inserta los datos en la tabla
  public addSitio(sitio){
    let sql = "INSERT INTO sitios (latitude, longitude, coords, description, foto) values (?,?,?,?,?)";
    return this.db.executeSql(sql,[sitio.latitude,sitio.longitude,sitio.coords,sitio.description,sitio.foto]);
  }

  public getSitios(){
    let sql = "SELECT * FROM sitios";
    return this.db.executeSql(sql,[]);
  }

  public modificaSitio(sitio){
    let sql = "UPDATE sitios  SET latitude = ?, longitude = ?, coords = ?, description = ?, foto = ? WHERE id = ? ";
    return this.db.executeSql(sql,[sitio.latitude,sitio.longitude,sitio.coords,sitio.description,sitio.foto, sitio.id]);
  }

  public borrarSitio(id){
    let sql = "DELETE FROM sitios WHERE id= ? ";
    return this.db.executeSql(sql,[id]);
 }
  
}