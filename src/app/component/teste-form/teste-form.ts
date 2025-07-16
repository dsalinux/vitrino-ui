import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-teste-form',
  imports: [FormsModule, InputTextModule],
  templateUrl: './teste-form.html',
  styleUrl: './teste-form.css'
})
export class TesteForm {
  teste: string = 'Hello Component!';
}
