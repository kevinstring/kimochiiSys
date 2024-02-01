import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServicioService {
   url="https://kimochiistore.com/kystem/back/public/"
  constructor(private http:HttpClient) { 
 
  }

  get(url:string){
    
    return this.http.get(this.url+url)
  }

  post(url:any,data: any){
    // Ejemplo de encabezados (headers)
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer tu-token',
    //   'Content-Type': 'multipart/form-data',
    //   'Accept': 'application/json',
    //   'enctype': 'multipart/form-data',
    //   // Agrega otros encabezados según sea necesario
    // });

    // Agrega los encabezados a la solicitud POST
    // const options = { headers: headers };

    return this.http.post(this.url + url, data);
  }

  login(data:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // Agrega otros encabezados según sea necesario
    });

    // Agrega los encabezados a la solicitud POST
    const options = { headers: headers };
    return this.http.post(this.url + 'login', data,options);

  }
}
