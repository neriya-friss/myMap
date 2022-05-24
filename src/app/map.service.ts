import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  static addpoint(name_of_point: any, lat_of_point: any, lng_of_point: any) {
    throw new Error('Method not implemented.');
  }

  constructor(public db:AngularFirestore) { }

  
  getPoints():Observable<any[]>{
    return this.db.collection('mapdata').valueChanges();
  }
 
  addpoint(PointName: any, lat: any ,lng: any)
    {
    console.log("in add")
    const point = {name:PointName, lat:lat, lng:lng }
    this.db.collection('mapdata').add(point);
  }

  deletepoint()
  {
    console.log("in delete")
    //this.db.doc(`mapdata/${name}`).delete();
  }


}

