import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-teste',
  imports: [InputTextModule,
    FormsModule,
  ],
  templateUrl: './teste.html',
  styleUrl: './teste.css'
})
export class Teste {

  nome: String = "Teste";

}
