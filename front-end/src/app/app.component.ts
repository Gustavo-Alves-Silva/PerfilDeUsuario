import { HttpErrorResponse  } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  public usuario!: Usuario; 
  public usuarios:Usuario[] = [];
  public editUsuario!: Usuario | null;
  public deleteUsuario!: Usuario | null;

  constructor (private usuarioService: UsuarioService){}

  ngOnInit(): void {
    // this.getUsuarios();
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

  public validarUsuarios(key: string, nome: string): void {
    const results: Usuario[]=[];
    for(const usuario of this.usuarios){
      console.log(usuario.nome.toLowerCase())
      if(usuario.nome.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) != -1){
        results.push(usuario);
      }
    }
    this.usuarios = results;
    if(results.length === 0 || !key) {
      this.getUsuarios();
    }
  }


  public onAddUsuario(addForm: NgForm): void{
    document.getElementById('add-pet-form')?.click();
  
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

  public onUpdateUsuario(usuario: Usuario): void{
    console.log(usuario.nome);
      this.usuarioService.updateUsuario(usuario).subscribe(
        (response: Usuario)=>{
          console.log(response);
          this.getUsuarios();
    
        },
        (error: HttpErrorResponse)=>{
          alert(error.message)
        }
      )
    }

    public onDeleteUsuario(usuarioId: number | undefined): void{

      this.usuarioService.deleteUsuario(usuarioId).subscribe(
        (response: void)=>{
          this.getUsuarios();
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
      
      button.setAttribute('data-target',`#${mode}PetModal`)
      
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


