import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../map.service';

 
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  
  mapPoints:any;
  
  constructor(public mapservice:MapService) { }

  ngOnInit() {  
  
  }


  private initMap(): void {
    var Map_A = L.tileLayer('http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}', {id: '1', tileSize: 512, zoomOffset: -1}),
        Map_B   = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {id: '2', tileSize: 512, zoomOffset: -1}),
        Map_C   = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {id: '2', tileSize: 512, zoomOffset: -1}),
        Map_D   = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {id: '2', tileSize: 512, zoomOffset: -1}),
        Map_E   = L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {id: '2', tileSize: 512, zoomOffset: -1}),
        Map_F   = L.tileLayer('http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}', {id: '2', tileSize: 512, zoomOffset: -1}),
        Map_G   = L.tileLayer('http://mt0.google.com/vt/lyrs=r&hl=en&x={x}&y={y}&z={z}', {id: '2', tileSize: 512, zoomOffset: -1}),
        Map_H   = L.tileLayer('http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}', {id: '2', tileSize: 512, zoomOffset: -1});
    var map = L.map('map', {
      center: [ 32.07911174, 34.77732566],    
      zoom: 8,
      layers: [Map_A]
  });
     
    var baseMaps = {
      "Map A": Map_A,
      "Map B":  Map_B,
      "Map C":  Map_C,
      "Map D":  Map_D,
      "Map E":  Map_E,
      "Map F":  Map_F,
      "Map G":  Map_G,
      "Map H":  Map_H,
  };
    
    var layerControl = L.control.layers(baseMaps).addTo(map);
    
   
    // var marker = L.marker([32.07911174, 34.77732566]).addTo(map);
  
    var polygon = L.polygon(
      [
        [31.6986843,35.3059387],
        [31.6682861,35.382843],
        [31.574691,35.3361511]
      ],{color: 'red',fillColor: '#f03',fillOpacity: 0.5}).addTo(map);

  // add all points from db
    this.mapPoints = this.mapservice.getPoints().subscribe(
      (res) => (
          res.forEach(element => {
            L.marker([element['point'].longitude, element['point'].latitude]).addTo(map);
          }
        )
      )
  )


}

  ngAfterViewInit(): void {
    this.initMap();
  }
}