import { HttpErrorResponse  } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuario';
import { UsuarioService } from 'src/app/usuario.service';
import { Router } from '@angular/router';

import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public usuarios:Usuario[] = [];

  constructor (private usuarioService: UsuarioService,private router: Router){}

  ngOnInit(): void {
     this.getUsuarios();
  }

  public getUsuarios():void{
    this.usuarioService.getUsuarios().subscribe(
      (response: Usuario[])=>{
        this.usuarios = response;
        console.log(this.usuarios);
      },
      (error: HttpErrorResponse)=> {
        alert(error.message);
      }
    );
  }

  public onAddUsuario(addForm: NgForm): void{
    document.getElementById('add-usuario-form')?.click();
  
    this.usuarioService.addUsuario(addForm.value).subscribe(
      (response: Usuario) =>{
        console.log(response);
        this.getUsuarios();
        addForm.reset();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  

  public validarUsuarios(key: String, nome: String): void {
    console.log(key);
    const results: Usuario[]=[];
    for(const usuario of this.usuarios){
      console.log(usuario.nome.toLowerCase())
      if(usuario.nome ===nome && usuario.senha === key){
        results.push(usuario);
        this.router.navigate(['/home']);
      }
    }
    this.usuarioService.setUsuarioLogado(results[0]);

    if(results.length === 0 || !key) {
      alert("Falho ao logar, senha ou usuario incorreto");
    }
  }


  public onOpenModal(usuario:Usuario | null, mode: string): void{
    const container =  document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    
    button.setAttribute('data-target',`#${mode}UsuarioModal`)
    
    container?.appendChild(button);
    button.click();


  }
}
