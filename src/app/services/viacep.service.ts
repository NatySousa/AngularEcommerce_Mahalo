import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {

  //inicializando o HttpClient por injeção de dependencia
  constructor(private httpClient: HttpClient) { }

  //método para consultar os dados de 1 endereço atraves do CEP
  get(cep: string) {
    return this.httpClient.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
}


