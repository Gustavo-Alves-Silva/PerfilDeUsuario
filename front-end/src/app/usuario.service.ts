import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from './usuario';

@Injectable({providedIn: 'root'})
export class UsuarioService {

    private apiServerUrl = environment.apiBaseUrl;

    private usuarioLogado!:Usuario;

    public getUsuarioLogado(){
      return this.usuarioLogado;
    }

    public setUsuarioLogado(usuario:Usuario){
      this.usuarioLogado = usuario;

    }

    constructor(private http: HttpClient){}


    public getUsuarios(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(`${this.apiServerUrl}/usuario/all`);
      }
    
      public addUsuario(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.apiServerUrl}/usuario/add`, usuario);
      }
    
      public updateUsuario(usuario: Usuario): Observable<Usuario> {
        return this.http.put<Usuario>(`${this.apiServerUrl}/usuario/update`, usuario);
      }
      
      public deleteUsuario(usuarioId: number | undefined): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/usuario/delete/${usuarioId}`);
      }
}