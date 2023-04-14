import { HttpErrorResponse  } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Usuario } from 'src/app/usuario';
import { UsuarioService } from 'src/app/usuario.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  public usuario: Usuario = this.usuarioService.getUsuarioLogado(); 
  public usuarios:Usuario[] = [];
  public editUsuario!: Usuario | null;
  public deleteUsuario!: Usuario | null;

  constructor (private usuarioService: UsuarioService, private router: Router){}
 
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

  public onUpdateUsuario(usuario: Usuario): void{
    console.log(usuario.nome);
      this.usuarioService.updateUsuario(usuario).subscribe(
        (response: Usuario)=>{
          console.log(response);
          this.validarUsuarios(usuario.nome, usuario.senha);
    
        },
        (error: HttpErrorResponse)=>{
          alert(error.message)
        }
      )
    }

    public onDeleteUsuario(usuarioId: number | undefined): void{

      this.usuarioService.deleteUsuario(usuarioId).subscribe(
        (response: void)=>{
          this.router.navigate(['/login']);
        },
        (error:HttpErrorResponse)=>{
          alert(error.message)
        }
      )
    }

    public onOpenModal(usuario:Usuario | null, mode: string): void{
      const container =  document.getElementById('main-container')
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle','modal');
      
      button.setAttribute('data-target',`#${mode}UsuarioModal`)
      
      if(mode === 'update'){
        this.editUsuario = usuario
      }
      if(mode === 'delete'){
        this.deleteUsuario = usuario
      }
      container?.appendChild(button);
      button.click();
  
  
    }
}
