import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EnderecosService } from '../services/enderecos.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html'
})
export class AddressComponent implements OnInit {

  //atributos
  mensagemSucesso = "";
  mensagemErro = "";

  //inicializando a classe EnderecosService por injeção de dependencia
  constructor(private enderecoService: EnderecosService) { }

  ngOnInit(): void {
  }

  //função limpar mensagem
  limparMensagens(): void {
    this.mensagemSucesso = "";
    this.mensagemErro = "";
  }

  //criando um atributo para capturar o conteúdo do formulário
  formAddress = new FormGroup({

    //declarando atributos para capturar cada campo do formulário
    logradouro: new FormControl('', [Validators.required]),//Regex

    numero: new FormControl('', [Validators.required]),

    complemento: new FormControl('', [Validators.required]),//Regex

    bairro: new FormControl('', [Validators.required]),

    cidade: new FormControl('', [Validators.required]),

    estado: new FormControl('', [Validators.required]),

    cep: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8}$')]),//Regex

  });

  // método para utilizar o FormGroup na pág HTML(formAddress)
  get form(): any {
    return this.formAddress.controls;
  }

  //método para capturar o SUBMIT do formulário
  onSubmit(): void {

    this.limparMensagens();

    var endereco = this.formAddress.value;
    this.enderecoService.create(endereco)
      .subscribe(    //capturando o retorno da requisição (PROMISSE)
        (data) => {  //callback de sucesso
          
          this.mensagemSucesso = data;

          this.formAddress.reset();  //limpa o conteúdo do formulário
          window.location.href = "/";
        },

        (e) => {  //callback de erro

          switch (e.status) {
            case 422: //Unprocessable entity
              this.mensagemErro = e.error;
              break;
            default:
              this.mensagemErro = "Não foi possível realizar o cadastro do endereço.";
              break;
          }

        }
      )
  }
}
