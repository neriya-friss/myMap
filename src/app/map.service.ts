import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(public db:AngularFirestore) { }

  
  getPoints():Observable<any[]>{
    return this.db.collection('mapdata').valueChanges();
  }
 
  addpoint(PointName:string,lat:number,lng:number)
    {
    const point = {name:PointName, lat:lat, lng:lng }
    this.db.collection('mapdata').add(point);
  }

  deletepoint()
  {
    console.log("in delete")
    //this.db.doc(`mapdata/${name}`).delete();
  }


}

