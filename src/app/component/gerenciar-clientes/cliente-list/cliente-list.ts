import { Component, OnInit } from "@angular/core";
import { Cliente } from "../../../models/cliente.model";
import { ClienteService } from "../../../services/cliente-service";
import { MessageService } from "primeng/api";
import { TableModule } from "primeng/table";
import { PanelModule } from "primeng/panel";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { ClienteForm } from "../client-form/cliente-form";


@Component({
    // selector: ""
    imports: [
        TableModule,
        PanelModule,
        ButtonModule,
        DialogModule,
        ClienteForm
    ],
    templateUrl: "./cliente-list.html"
})
export class ClienteList implements OnInit {
    clientes: Cliente[] = []
    selectedCliente: Cliente | null = null
    displayClienteFormDialog: boolean = false

    constructor(
        private clienteService: ClienteService,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.loadClientes()
    }

    loadClientes(): void {
        this.clienteService.getClientes().subscribe({
            next: (clientes: Cliente[]) => {
                this.clientes = clientes;
            },
            error: (error) => {
                console.error('Erro ao carregar clientes:', error);
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível carregar os clientes.' });
            }
        });
    }

    // edit client
    editCliente(cliente: Cliente) {
        this.selectedCliente = cliente
        this.displayClienteFormDialog = true
    }

    // add new client
    openNewClienteDialog() {
        this.selectedCliente = null
        this.displayClienteFormDialog = true
    }

    onClienteSaved(s: boolean) {
        // can save new client or cancel operation
        this.displayClienteFormDialog = false
        if (s) this.loadClientes()
    }
}