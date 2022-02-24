import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //atributos
  mensagemSucesso ="";
  mensagemErro ="";

   //inicializando a classe ClientesService por injeção de dependencia
  constructor(private clientesService : ClientesService) { }

  ngOnInit(): void {
  }

  //função limpar mensagem
  limparMensagens() : void{
    this.mensagemSucesso ="";
    this.mensagemErro ="";
  }

  //criando um atributo para capturar o conteúdo do formulário
   formRegister = new FormGroup({

    //declarando atributos para capturar cada campo do formulário
    nome: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-zÀ-Üà-ü\\s]{6,150}$')]),//Regex

    email: new FormControl('',[Validators.required, Validators.email]),

    cpf: new FormControl('',[Validators.required, Validators.pattern('^[0-9]{11}$')]),//Regex

    senha: new FormControl('',[Validators.required, Validators.minLength(8), Validators.maxLength(20)]),

    senhaConfirmacao: new FormControl('',[Validators.required])

  });

  // método para utilizar o FormGroup na pág HTML(formRegister)
  get form(): any 
  {
    return this.formRegister.controls;
  }

  //método para capturar o SUBMIT do formulário
  onSubmit(): void {

    this.limparMensagens();

    var cliente = this.formRegister.value;

   this.clientesService.create(cliente)
       .subscribe(     //capturando o retorno da requisição (PROMISSE)
         (data) => {  //callback de sucesso
           this.mensagemSucesso = data;

           this.formRegister.reset();  //limpa o conteúdo do formulário
         },

         (e) => {  //callback de erro

          switch (e.status){
            case 422: //Unprocessable entity

            this.mensagemErro = e.error;
            break;
            default:
              this.mensagemErro = "Não foi possível realizar o cadastro do cliente.";
              break;  
          }
        
         }  
         )
  }    
}
