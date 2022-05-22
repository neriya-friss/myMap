import { Component, OnInit} from '@angular/core';
import { Router,Params,ActivatedRoute } from '@angular/router';
import { MapService } from '../map.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
  constructor(public mapservice:MapService, private router:Router,private route: ActivatedRoute) { }


  name:string;
  lat;
  lng;

  
  ngOnInit(): void {
    this.lat = this.route.snapshot.paramMap.get('lat');
    this.lng = this.route.snapshot.paramMap.get('lng');
  }

  onSubmit(){ 
    
    if(this.name ==null || this.lat ==null  || this.lng ==null){
        alert("All fields in this form are required")
      }
      else{
      this.mapservice.addpoint(this.name ,this.lat, this.lng)
      this.router.navigate(["map/"+this.lat+"/"+this.lng]);
     }
    } 
  }

