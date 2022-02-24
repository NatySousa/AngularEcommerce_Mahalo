import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  //atributo
  uri = environment.apiUrl + "/produtos";

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(this.uri);
  }

  getById(idProduto: string) {
    return this.httpClient.get(this.uri + "/" + idProduto);
  }
}
