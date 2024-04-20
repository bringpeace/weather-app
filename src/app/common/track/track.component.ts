import { Component, OnInit,Input } from '@angular/core';
import { FormControl,FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css'],
  providers:[ServiceService]
})
export class TrackComponent implements OnInit {
  @Input() fromParent!: string;


myForm:FormGroup;
weatherData:any;
cityName!: string;
  longitude!: number;
  latitude!: number;






constructor(private formBuilder: FormBuilder,private service :ServiceService){
  this.myForm = this.formBuilder.group({
  emailid:'',
  city:'',

  });

  


}
  ngOnInit(): void {
    
   //  this.SendTemp();
   
     
    
  }

onSubmit():void{
  const formData = this.myForm.value;
  this.cityName=formData.city;

  const cityObject = this.GetCityData(this.cityName);

  console.log('Form submitted:',formData);
  console.log(this.cityName);


  this.SendTemp(this.cityName);

  this.GetAirIndex(cityObject.lat,cityObject.lon);

  
  
 

  this.myForm.reset();
}



SendTemp(cityName:any):void{
this.service.getJsonData(cityName).subscribe(data=>{
this.weatherData = Math.round(data.main.temp-273.15) ;
})

}

GetCityData(cityName:any):{lon:Number,lat:Number}{
  this.service.getCityData(cityName).subscribe(data =>{
console.log(data);
    this.longitude = data[0].lon;
    this.latitude= data[0].lat;

  })

  return {lon:this.longitude,lat:this.latitude}
}



GetAirIndex(lat: any, lon:any):void{

  this.service.getAirIndex(lat,lon).subscribe(data =>{
    console.log(data);
  })

}
}
