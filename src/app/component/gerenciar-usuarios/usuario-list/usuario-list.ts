import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { UsuarioForm } from '../usuario-form/usuario-form';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario-service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-usuario-list',
  imports: [CommonModule,
    CardModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    TagModule, 
    UsuarioForm],
  templateUrl: './usuario-list.html',
  styleUrl: './usuario-list.css'
})
export class UsuarioList implements OnInit {

  usuarios: Usuario[] = [];
  selectedUsuario: Usuario | null = null;
  displayUsuarioFormDialog: boolean = false;

   constructor(
    private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível carregar os usuários.' });
      }
    );
  }

  deleteUsuario(usuario: Usuario): void {

  }

  editUsuario(usuario: Usuario): void {

  }

  openNewUsuarioDialog(): void {
    this.selectedUsuario = null; // Zera para indicar criação de novo usuário
    this.displayUsuarioFormDialog = true;
  }


}
