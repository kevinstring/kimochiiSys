import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServicioService {
   url="http://127.0.0.1:8000/"
  constructor(private http:HttpClient) { 
 
  }

  get(url:string){
    
    return this.http.get(this.url+url)
  }

  post(url:any,data: any){
    // Ejemplo de encabezados (headers)
    const headers = new HttpHeaders({
      'Authorization': 'Bearer tu-token',
      'Content-Type': 'application/json',
      // Agrega otros encabezados según sea necesario
    });

    // Agrega los encabezados a la solicitud POST
    const options = { headers: headers };

    return this.http.post(this.url + url, data, options);
  }
}
