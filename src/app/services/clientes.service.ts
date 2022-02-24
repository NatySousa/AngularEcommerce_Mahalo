import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  //atributo
  uri = environment.apiUrl + "/clientes";

  //inicializar o HttpClient(injeção de dependencia)
  constructor(private httpClient : HttpClient) { }

  //função para realizar uma chamada de cadastro de cliente na api
  create(cliente: any) {
    return this.httpClient.post(this.uri, cliente,{responseType: 'text'});
  }
}
