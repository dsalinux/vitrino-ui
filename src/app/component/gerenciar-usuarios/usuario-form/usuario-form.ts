import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class UsuarioForm implements OnInit, OnChanges {
  @Input() usuario: Usuario | null = null;
  @Output() usuarioSaved = new EventEmitter<boolean>();
  usuarioForm!: FormGroup;
  allPermissoes: Permissao[] = []; // Para armazenar todas as permissões disponíveis

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private messageService: MessageService
  ) { }
 

  ngOnChanges(changes: SimpleChanges): void {
    // Verifica se a propriedade 'usuario' mudou E se o formulário já foi inicializado
    if (changes['usuario'] && this.usuarioForm) {
      if (this.usuario) {
        // Estamos editando um usuário existente
        // Use patchValue para preencher o formulário
        this.usuario.senha = '';
        this.usuarioForm.patchValue({
          ...this.usuario,
          // Converte a string de data para um objeto Date, necessário para p-calendar
          dataDesativacao: this.usuario.dataDesativacao ? new Date(this.usuario.dataDesativacao) : null
        });

        // Remova o validador de obrigatoriedade da senha para edição
        // A senha só será exigida se o usuário preencher o campo
        this.usuarioForm.get('senha')?.clearValidators();
        // this.usuarioForm.get('senha')?.updateValueAndValidity(); 

        } else {
          // Se allPermissoes ainda não carregou, configure um subscription temporário
          // Ou considere carregar allPermissoes ANTES de abrir o diálogo do formulário.
          // Para este caso, vamos deixar a lógica principal em loadAllPermissoes.
        }

      } else {
        // Estamos criando um novo usuário
        this.usuarioForm.reset(); // Limpa o formulário para um novo usuário
        this.usuarioForm.get('permissoes')?.setValue([]); // Garante que as permissões também sejam limpas
        // Restaura o validador de obrigatoriedade da senha para criação
        this.usuarioForm.get('senha')?.setValidators(Validators.required);
        this.usuarioForm.get('senha')?.updateValueAndValidity();
      }
    }
  
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
    if(this.usuarioForm.valid) {
      const usuarioParaSalvar: Usuario = this.usuarioForm.value;
      if(usuarioParaSalvar.id) {
      this.usuarioService.updateUsuario(usuarioParaSalvar.id, usuarioParaSalvar).subscribe({
        next: (data) => {
            this.messageService.add({severity:'success', summary:'Sucesso', detail:'Usuário atualizado com sucesso'});
            this.usuarioSaved.emit(true); // Emite evento para o componente pai
          },
          error: (error) => {
            console.error('Erro ao atualizar usuário:', error);
            this.messageService.add({severity:'error', summary:'Erro', detail:'Falha ao atualizar usuário'});
          }
      });
     } else { // Se o ID não existe, é uma criação
        this.usuarioService.createUsuario(usuarioParaSalvar).subscribe({ 
          next: (response) => {
            this.messageService.add({severity:'success', summary:'Sucesso', detail:'Usuário criado com sucesso'});
            this.usuarioSaved.emit(true); // Emite evento para o componente pai
          },
          error: (error) => {
            console.error('Erro ao criar usuário:', error);
            this.messageService.add({severity:'error', summary:'Erro', detail:'Falha ao criar usuário'});
          }
        });
      }
    }
  }

  cancel(): void {
    this.usuarioSaved.emit(false);
  }
}