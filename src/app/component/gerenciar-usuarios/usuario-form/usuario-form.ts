import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario-service';
import { MessageService } from 'primeng/api';
import { Permissao } from '../../../models/permissao.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { DatePickerModule } from 'primeng/datepicker';


@Component({
  selector: 'app-usuario-form',
  imports: [ CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    MultiSelectModule,
    DatePickerModule],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.css'
})
export class UsuarioForm {
  @Input() usuario: Usuario | null = null;
  @Output() usuarioSaved = new EventEmitter<boolean>();
  usuarioForm!: FormGroup;
  allPermissoes: Permissao[] = []; // Para armazenar todas as permissões disponíveis

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private messageService: MessageService
  ) { }
  ngOnInit(): void {
    this.initForm();
    this.loadAllPermissoes(); // Carrega todas as permissões disponíveis
  }

  initForm(): void {
    this.usuarioForm = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required], // Senha obrigatória na criação
      dataDesativacao: [null], // Pode ser nula
      permissoes: [[]] // Inicializa como array vazio
    });

  
  }
  loadAllPermissoes(): void { 

  }

  saveUsuario(): void {

  }

  cancel(): void {
    this.usuarioSaved.emit(false);
  }
}