import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  constructor(private http:HttpClient) {
   
   }
   url="http://127.0.0.1:8000/"

   get(url:any){
    return this.http.get(`${this.url}${url}`)
   }

   post(url,form){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer tu_token', 
    });
    return this.http.post(`${this.url}${url}`,form,{headers:headers})
   }
   
}
