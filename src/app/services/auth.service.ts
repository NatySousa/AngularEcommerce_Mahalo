import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //atributo
  uri = environment.apiUrl + "/auth";

  //inicializando o objeto HttpClient por
  //meio de injeção de dependencia..
  constructor(private httpClient: HttpClient) { }

  //função para realizar uma chamada de autenticação de cliente na API
  authenticate(cliente: any) {
    return this.httpClient.post(this.uri, cliente);
  }
}
