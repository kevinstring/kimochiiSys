import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServicioService {
   url="http://127.0.0.1:8000/"
  constructor(private http:HttpClient) { 
 
  }

  getProducto(url:string){
    return this.http.get(this.url+url)
  }
}
