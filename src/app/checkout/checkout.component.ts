import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';
import { EnderecosService } from '../services/enderecos.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  //atributos
  mensagemSucesso = "";
  mensagemErro = "";

  valorTotal = 0;
  quantidadeItens = 0;

  produtos = [{
    idProduto: '',
    nome: '',
    preco: 0,
    quantidade: 0,
    foto: ''
  }];

  produto = {
    idProduto: '',
    nome: '',
    preco: 0,
    quantidade: 0,
    foto: ''

  };

  endereco = {
    idEndereco: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
  };

  pedido = {
    dataPedido: new Date(),
    valortotal: this.valorTotal,
    idEndereco: '',
    itensPedido: [{
      idProduto: this.produto.idProduto,
      quantidadeProduto: this.produto.quantidade
    }]
  };


  constructor(private checkoutService: CheckoutService, private enderecoService: EnderecosService) { 
    
  }

  limparMensagens(): void {
    this.mensagemSucesso = "";
    this.mensagemErro = "";
  }

  ngOnInit(): void {
    this.enderecoService.getAll()
      .subscribe( //retorna o promisse
        (data) => { //callback de sucesso
          this.endereco = (data as any[])[0];
        },
        (e) => { //callback de erro
          console.log(e);
        }
      )

    //ler o conteudo da sessão..
    if (localStorage.getItem('CESTA_DE_COMPRAS') != null) {
      var dados = localStorage.getItem('CESTA_DE_COMPRAS') as string;
      this.produtos = JSON.parse(dados);

      //calcular o valor total e a quantidade de itens
      for (var i = 0; i < this.produtos.length; i++) {
        this.valorTotal += (this.produtos[i].preco
          * this.produtos[i].quantidade);
        this.quantidadeItens += this.produtos[i].quantidade;
      }
    }
    this.pedido.valortotal = this.valorTotal;
    this.pedido.idEndereco = this.endereco.idEndereco;
   
      for (var j = 0; j < this.produtos.length; j++) {
        this.pedido.itensPedido[j].idProduto = this.produtos[j].idProduto;
        this.pedido.itensPedido[j].quantidadeProduto = this.produtos[j].quantidade;
      }

  }
  cadastrarPedido(): void {

    this.limparMensagens();

    this.pedido.idEndereco = this.endereco.idEndereco;
    this.checkoutService.create(this.pedido)
      .subscribe(
        (data) => {
          this.mensagemSucesso = data;
          if(localStorage.getItem('CESTA_DE_COMPRAS') != null){
            //romevendo o conteudo gravado em sessão
             localStorage.removeItem('CESTA_DE_COMPRAS');
            
          }
          window.location.href = "/home";
        },
        (e) => {
          switch (e.status) {
            case 422: //Unprocessable entity
            console.log(e.error);
              this.mensagemErro = e.error;
              break;
            default:
              this.mensagemErro = "Não foi possível realizar o cadastro do endereço.";
              break;
          }
        }       
      )
      
  }
  onSubmit(): void {
    // console.log(this.pedido)
    // console.log("teste")
    // this.checkoutService.create(this.pedido)
    //   .subscribe(     //capturando o retorno da requisição (PROMISSE)
    //     (data) => {  //callback de sucesso
    //       this.mensagemSucesso = "Pedido realizado com sucesso.";

    //     },

    //     (e) => {  //callback de erro

    //       switch (e.status) {
    //         case 422: //Unprocessable entity

    //           this.mensagemErro = e.error;
    //           break;
    //         default:
    //           this.mensagemErro = "Não foi possível realizar o cadastro do endereço.";
    //           break;
    //       }

    //     }
    //   )
  }
}

