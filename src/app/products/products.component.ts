import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../services/produtos.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  //atributo
  isLoading = true;
  isLoadingItem =true;
  

  //atributo
  produtos = [{
    idProduto: '',
    nome: '',
    preco: 0,
    quantidade: 0,
    foto: []
  }];

  //atributo
  produto = {
    idProduto: '',
    nome: '',
    preco: 0,
    quantidade: 0,
    foto: ''    
  
  };

  
  //inicialização (injeção de dependencia)
  constructor(private produtosService: ProdutosService) {  }

  //evento executado quando o componente é carregado
  ngOnInit(): void {
    //executando a chamada na API (GET) para consultar os produtos
    this.produtosService.getAll()
      .subscribe( //retorna o promisse
        (data) => { //callback de sucesso
          this.produtos = (data as any[]);
          this.isLoading = false;
        },
        (e) => { //callback de erro
          console.log(e);
        }
      )
  }

  //função para obter 1 produto na API atraves do ID..
  obterPorId(idProduto: string): void {
     
    this.produtosService.getById(idProduto)
      .subscribe(
        (data) => {
          this.produto = (data as any);
          this.isLoadingItem = false;
        },
        (e) => {
          console.log(e);
        }       
      )
  }
  //função para adicionar um item ao pedido..
  adicionarItem(item : any) : void {

    //iniciando o item com quantidade = 1
    item.quantidade = 1;

    var cestaDeCompras = []; //array..

    //verificar se já existem produtos adicionados em sessão..    
    if(localStorage.getItem('CESTA_DE_COMPRAS') != null){
      //capturar o conteudo gravado em sessão
      var dados = localStorage.getItem('CESTA_DE_COMPRAS');
      cestaDeCompras = JSON.parse(dados as string) as any[];
    }

    //verificar se o produto ja existe na cesta de compras
    var produtoJaAdicionado = false;

    for (var i = 0; i < cestaDeCompras.length; i++) {
      if (item.idProduto == cestaDeCompras[i].idProduto) {
        cestaDeCompras[i].quantidade++; //incrementando a quantidade
        produtoJaAdicionado = true;
      }
    }

    //verificar se o produto não esta na cesta de compras
    if (!produtoJaAdicionado) {
      //adicionar o produto que foi selecionado na página
      cestaDeCompras.push(item);
    }

    //gravar novamente os dados da cesta de compras em sessão
    localStorage.setItem('CESTA_DE_COMPRAS', 
                 JSON.stringify(cestaDeCompras));

    //redirecionar para a página de carrinho de compras
    window.location.href = "/shopping-cart";
  }  
}




