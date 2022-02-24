import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  //atributo
  uri = environment.apiUrl + "/pedidos";

  headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('AUTH') as string).accessToken}`
  });

  constructor(private httpClient: HttpClient) {

    var auth = localStorage.getItem('AUTH') as string;
    var accessToken = JSON.parse(auth).accessToken;

    this.headers.set('Authorization', `Bearer ${accessToken}`);
  }

  create(endereco: any) {
    return this.httpClient.post(this.uri, endereco,
      { headers: this.headers, responseType: 'text' })
  }

  getAll() {
    return this.httpClient.get(this.uri,
      { headers: this.headers, responseType: 'text' })
  }

}
