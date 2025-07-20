import { Component } from '@angular/core';
import { Card } from "primeng/card";
import { TableModule } from "primeng/table";
import { Fluxo_Caixa } from '../../../models/fluxo-caixa.model';
import { FluxoService } from '../../../services/fluxo-caixa-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fluxo-list',
  imports: [Card, TableModule, CommonModule],
  templateUrl: './fluxo-list.html',
  styleUrl: './fluxo-list.css'
})
export class FluxoList {
  fluxo: Fluxo_Caixa[] = [];
  loading = false;
  error: string | null = null;
  constructor(private FluxoService: FluxoService) {}

  ngOnInit() {
    this.loadFluxosCaixa();
  }

  loadFluxosCaixa(): void {
    this.loading = true;
    this.error = null;
    
    this.FluxoService.getFluxoCaixa().subscribe({
      next: (data) => {
        this.fluxo = data;
        this.loading = false;
        console.log('Dados recebidos:', data); // Para debug
      },
      error: (err) => {
        this.error = 'Erro ao carregar dados';
        this.loading = false;
        console.error('Erro:', err);
      }
    });
  }
}
