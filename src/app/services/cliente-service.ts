import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
private apiUrl = 'http://localhost:8080/clientes'; // URL da sua API Spring Boot

  constructor(private http: HttpClient) { }

  // Buscar todos os clientes
  getClientes(): Observable<Cliente[]> {
    console.log('Fetching all users from API');
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  // Buscar um cliente por ID
  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  // Criar um novo cliente
  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  // Atualizar um cliente existente
  updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente);
  }

  // Deletar um cliente
  deleteCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
