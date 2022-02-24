import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

 //atributo
 uri = environment.apiUrl + "/pedidos";
 headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('AUTH') as string).accessToken}`
 });

 constructor(private httpClient: HttpClient) {  
   var auth = localStorage.getItem('AUTH') as string;
   var accessToken = JSON.parse(localStorage.getItem('AUTH') as string).accessToken;

   this.headers.set('Authorization', 'Bearer ' + accessToken);
   
 }

 create(pedidos: any) {

   console.log(this.headers);
   return this.httpClient.post(this.uri, pedidos, {headers : this.headers, responseType: 'text'})
 }

 // put(endereco: any) {
 //   return this.httpClient.put(this.uri, endereco,
 //     { headers: this.headers })
 // }

 // remove(id: string) {
 //   return this.httpClient.delete(this.uri + "/" + id,
 //     { headers: this.headers })
 // }



 // getAll() {
 //   return this.httpClient.get(this.uri,
 //     { headers: this.headers })
 // }
}
