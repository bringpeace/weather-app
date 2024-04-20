import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService  implements OnInit{

  WeatherData:any;
  cityName:any
  lat:any;
  lon:any;

  apiKey= environment.apiKey;
  
 //cityName='mumbai';
 // private dataUrl =`https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${this.apiKey}`;
 private dataUrl;

 private airPollutionUrl;

 private cityToLat;
  

  constructor(private http:HttpClient) {
    this.dataUrl=environment.dataUrl;
    this.airPollutionUrl = environment.airPollutionUrl;
    this.cityToLat = environment.cityToLat;
  }

  ngOnInit():void{} 


getJsonData(cityName: any): Observable<any> {
  const params = new HttpParams().set('q',cityName).set('apiKey',this.apiKey);

  return this.http.get(this.dataUrl,{params});

  }

  getCityData(cityName: any): Observable<any> {
    const params = new HttpParams().set('q',cityName).set('apiKey',this.apiKey);
  
    return this.http.get(this.cityToLat,{params});
  
    }

getAirIndex(lat: any, lon:any): Observable<any>{
  const params = new HttpParams().set('lat',lat).set('lon',lon).set('appid',this.apiKey);
  return this.http.get(this.airPollutionUrl,{params});     //only takes params as argumaent no other name is considered.
}



  
}

