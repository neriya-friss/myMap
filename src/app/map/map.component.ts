import { MapService } from './../map.service';
import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Router } from '@angular/router';
import '@geoman-io/leaflet-geoman-free';  
import * as $ from 'jquery';
   

 
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})

export class MapComponent implements AfterViewInit {
  
  constructor(public mapservice:MapService, private router: Router) { }
  
  mapPoints:any;


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
        Map_H   = L.tileLayer('http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}', {id: '2', tileSize: 512, zoomOffset: -1}),
        Map_I  = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {id: '2', tileSize: 512, zoomOffset: -1});

        L.PM.setOptIn(false);
    var map = L.map('map',  {
      pmIgnore: false,
      center: [ 32.07911174, 34.77732566],    
      zoom: 8,
      layers: [Map_A]
  },);
  

  map.pm.addControls({  
    position: 'topleft', 

  });  

/*
  map.on('pm:drawstart', ({ workingLayer }) => {
    var points= [];
    workingLayer.on('pm:vertexadded', (e) => {
      points.push(e.latlng);
      console.log("points",points);
      });
    });
*/
  map.on('pm:create', function(e) {
    var points= [];
    if(e.shape === 'Polygon'  || e.shape === 'Rectangle' || e.shape === 'Line'){
      points.push((e.layer as L.Polygon).getLatLngs(),e.shape);
      console.log(points);
   }
   else if(e.shape === 'Marker'){
    console.log(e.shape);
    console.log((e.layer as L.Marker)['_latlng'],e.shape);
   
    var popupContent = 
    '<form role="form" id="form" enctype="multipart/form-data" class = "form-horizontal">'+
    '<div class="form-group">'+
        '<label class="control-label col-sm-5"><strong>Point name: </strong></label>'+
        '<input type="text" placeholder="Point name" id="point_name" name="point_name"   class="form-control" required s/>'+ 
    '</div>'+
          '<input style="display: inline;" type="text" id="lat" name="lat"  value="'+(e.layer as L.Marker)['_latlng'].lat+'" />'+
          '<input style="display: inline;" type="text" id="lng" name="lng"  value="'+(e.layer as L.Marker)['_latlng'].lng+'" />'+
          '<div class="form-group">'+
            '<div style="text-align:center;" class="col-xs-4 col-xs-offset-2"><button type="button" class="btn">Cancel</button></div>'+
            '<div style="text-align:center;" class="col-xs-4"><button type="submit" value="submit" class="btn btn-primary trigger-submit">Submit</button></div>'+
          '</div>'+
          '</form>';
    var popup = L.popup();
    popup
    .setLatLng((e.layer as L.Marker)['_latlng'])
    .setContent(popupContent)
    .openOn(map)
    
    $("#form").submit(function(e){
      e.preventDefault();
      console.log("in add")
      var name_of_point =$("#point_name").val();
      var lat_of_point =$("#lat").val();
      var lng_of_point =$("#lng").val();   
      if(name_of_point ==null || lat_of_point ==null  || lng_of_point ==null){
          alert("All fields in this form are required")
        }
        else{
        console.log(name_of_point)
        alert("ok")
        console.log("aaa")
        this.mapservice.addpoint(name_of_point,lat_of_point, lng_of_point)
        
       }
   })
  }
  
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
      "Map_I" : Map_I,
  };
    
    var layerControl = L.control.layers(baseMaps).addTo(map);
    
    L.marker([32.07911174, 34.77732566], { pmIgnore: true }).addTo(map); 
    
    
    // var marker = L.marker([32.07911174, 34.77732566]).addTo(map);
  
    var polygon = L.polygon(
      [
        [31.6986843,35.3059387],
        [31.6682861,35.382843],
        [31.574691,35.3361511]
      ],{color: 'red',fillColor: '#f03',fillOpacity: 0.5}).bindPopup("I am a polygon.").addTo(map);

  // add all points from db
  
var geojsonMarkerOptions = {
  radius: 4,
  fillColor: "#ff7800",
  color: "#000",
  weight: 0.5,
  opacity: 1,
  fillOpacity: 1
  };
    this.mapPoints = this.mapservice.getPoints().subscribe(
      (res) => (
          res.forEach(element => { 
            var div = "<div>"+element['name']+"</div>"
            L.circleMarker([element['lat'], element['lng']], geojsonMarkerOptions)
            .bindTooltip(div).addTo(map);
          }
        )
      )
  )
  
 /*
  var popup = L.popup();
  function onMapClick(e) {
    popup
          .setLatLng(e.latlng)
          .setContent( e.latlng.toString())
          .openOn(map)
          window.location.href ="/form/"+e.latlng.lat+"/"+e.latlng.lng;       
  }
 
  map.on('click', onMapClick);
*/

  }
  

  ngAfterViewInit(): void {
    this.initMap();
    
  }

}



