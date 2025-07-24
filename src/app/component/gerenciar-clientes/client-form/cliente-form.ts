import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { Cliente } from "../../../models/cliente.model";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ClienteService } from "../../../services/cliente-service";
import { MessageService } from "primeng/api";
import { IftaLabelModule } from "primeng/iftalabel";
import { InputText, InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'app-cliente-form',
  imports: [
    IftaLabelModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './cliente-form.html',
  // styleUrl: './cliente-form.css'
})
export class ClienteForm implements OnInit, OnChanges {
  @Input() cliente: Cliente | null = null;
  @Output() clienteSaved = new EventEmitter<boolean>();
  clienteForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private messageService: MessageService
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cliente'] && this.clienteForm) {
      if (this.cliente) {
        this.cliente.senha = '';
        this.clienteForm.patchValue({
          ...this.cliente,
        });

        this.clienteForm.get('senha')?.clearValidators();
        // this.usuarioForm.get('senha')?.updateValueAndValidity(); 

      } else {

      }

    } else {
      this.clienteForm.reset();
      this.clienteForm.get('permissoes')?.setValue([]);
      this.clienteForm.get('senha')?.setValidators(Validators.required);
      this.clienteForm.get('senha')?.updateValueAndValidity();
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.loadAllPermissoes();
  }

  initForm(): void {
    this.clienteForm = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      sobrenome: [''],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      // grande chance de dar errado. eu odeio regex
      cpf: ['', Validators.required, Validators.pattern("^\d{3}\.\d{3}\.\d{3}\-\d{2}$")],
      telefone: ['', Validators.required, Validators.pattern('\(\d{2,}\) \d{4,}\-\d{4}')],
      dataNascimento: [Date, Validators.required],
      dataRegistro: [Date, Validators.required],
      dataBloqueio: [null],
      permissoes: [[]]
    });
  }
  loadAllPermissoes(): void {

  }

  submitForm(): void {
    if (this.clienteForm.invalid) {
      this.messageService.add({ severity: 'error', detail: 'Deu pau' })
      return
    }

    const novoCliente: Cliente = this.clienteForm.value
    // atualiza cliente
    if (novoCliente.id) {
      this.clienteService.updateCliente(novoCliente.id, novoCliente).subscribe(
        c => {
          this.messageService.add({ severity: 'success', detail: 'Cliente atualizado com sucesso' })
          this.clienteSaved.emit(true)
        },
        e => this.messageService.add({ severity: 'error', detail: 'Erro ao atualizar cliente' })
      )
    }
    // cria novo cliente
    else {
      this.clienteService.createCliente(novoCliente).subscribe(
        c => {
          this.messageService.add({ severity: 'success', detail: 'Cliente cadastrado com sucesso' })
          this.clienteSaved.emit(true)
        },
        e => this.messageService.add({ severity: 'error', detail: 'Erro ao cadastrar cliente' })
      )
    }
  }

  saveCliente(): void {
    if (this.clienteForm.valid) {
      const clienteParaSalvar: Cliente = this.clienteForm.value;
      if (clienteParaSalvar.id) {
        this.clienteService.updateCliente(clienteParaSalvar.id, clienteParaSalvar).subscribe({
          next: (data) => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário atualizado com sucesso' });
            this.clienteSaved.emit(true);
          },
          error: (error) => {
            console.error('Erro ao atualizar usuário:', error);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao atualizar usuário' });
          }
        });
      } else { // Se o ID não existe, é uma criação
        this.clienteService.createCliente(clienteParaSalvar).subscribe({
          next: (response) => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente criado com sucesso' });
            this.clienteSaved.emit(true); // Emite evento para o componente pai
          },
          error: (error) => {
            console.error('Erro ao criar usuário:', error);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao criar usuário' });
          }
        });
      }
    }
  }

  cancel(): void {
    this.clienteSaved.emit(false);
  }
}