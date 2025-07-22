import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fluxo_Caixa } from '../models/fluxo-caixa.model';

@Injectable({
  providedIn: 'root'
})
export class FluxoService {
  private apiUrl = 'http://localhost:8080/fluxo_caixa';

  constructor(private http: HttpClient) {}

  getFluxoCaixa(): Observable<Fluxo_Caixa[]> {
    return this.http.get<Fluxo_Caixa[]>(this.apiUrl);
  }
}
