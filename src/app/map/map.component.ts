import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

 
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  
  

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
      zoom: 7,
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
    
    
}

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }
}