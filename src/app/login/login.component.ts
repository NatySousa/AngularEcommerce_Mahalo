import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  //atributo
  mensagemAcessoNegado = '';

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  //criando um atributo para capturar o conteudo do formulario
  formLogin = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    senha: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20)
    ])
  });

  //método para utilizar o FormGroup na pagina HTML (formRegister)
  get form(): any {
    return this.formLogin.controls;
  }

  //função para capturar o submit do formulário
  onSubmit(): void {
    var cliente = this.formLogin.value;

    this.authService.authenticate(cliente)
    .subscribe(
      (data)=> {
      //armazenar os dados obtidos da API em uma sessão..
      localStorage.setItem('AUTH', JSON.stringify(data as any));

      //redirecionar para a página inicial do projeto
      window.location.href = "/";

    },
    (e: any) => {
      switch (e.status) {
        case 401:
          this.mensagemAcessoNegado = e.error;
          break;
        default:
          this.mensagemAcessoNegado = "Não foi possível autenticar o usuário";
                                       
          break;
      }
    }
  )
}

limparMensagens(): void {
this.mensagemAcessoNegado = '';
}
}
