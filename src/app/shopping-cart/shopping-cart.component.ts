import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  valorTotal = 0;
  quantidadeItens = 0;

  produtos = [{
    idProduto: '',
    nome: '',
    preco: 0,
    quantidade: 0,
    foto: ''
  }];

  constructor() { }

  ngOnInit(): void {
    //ler o conteudo da sessão..
    if(localStorage.getItem('CESTA_DE_COMPRAS') != null){
      var dados = localStorage.getItem('CESTA_DE_COMPRAS') as string;
      this.produtos = JSON.parse(dados);

      //calcular o valor total e a quantidade de itens
      for(var i = 0; i < this.produtos.length; i++){
        this.valorTotal += (this.produtos[i].preco  * this.produtos[i].quantidade);
        this.quantidadeItens += this.produtos[i].quantidade;
      }
    }
  }

  limparCesta() : void {
    if(window.confirm('Deseja realmente excluir todos os itens da sua cesta de compras?')){
      localStorage.removeItem('CESTA_DE_COMPRAS');
      window.location.href = '/shopping-cart'; //recarregar a página
    }
  }
  
  aumentarItem(item: any): void {
    var dados = localStorage.getItem('CESTA_DE_COMPRAS') as string;
    var itens = JSON.parse(dados);

    for (var i = 0; i < itens.length; i++) {
      if (itens[i].idProduto == item.idProduto) {
        itens[i].quantidade++; //incrementando
        break;
      }
    }

    localStorage.setItem('CESTA_DE_COMPRAS', JSON.stringify(itens));
    window.location.href = "/shopping-cart";
  }

  diminuirItem(item: any): void {
    var dados = localStorage.getItem('CESTA_DE_COMPRAS') as string;
    var itens = JSON.parse(dados);

    for (var i = 0; i < itens.length; i++) {
      if (itens[i].idProduto == item.idProduto 
       && itens[i].quantidade > 0) {
        itens[i].quantidade--; //decrementando
        break;
      }
    }
    //se a quantidade de um item for zero, 
    //ele deverá ser removido da cesta de compras
    itens = itens.filter(function(i:any){
      return i.quantidade > 0;
    });
    localStorage.setItem('CESTA_DE_COMPRAS', JSON.stringify(itens));
    window.location.href = "/shopping-cart";
  }
}

