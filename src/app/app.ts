import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MenubarModule, ToolbarModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'vitrino-aula';
  items = [
    {
      label: 'Dashboard',
      icon: 'pi pi-fw pi-home',
      routerLink: '/'
    },
    {
      label: 'Cadastros',
      icon: 'pi pi-fw pi-file-edit',
      items: [
        {
          label: 'Usuários',
          icon: 'pi pi-fw pi-user',
          routerLink: '/usuarios' 
        }
      ]
    },
    {
      label: 'Fluxo Caixa',
      icon: 'pi pi-fw pi-dollar',
      routerLink: '/fluxo-caixa',
    },
    {
      label: 'Help',
      items: [
        { label: 'Contents', icon: 'pi pi-fw pi-book' },
        { label: 'Search', icon: 'pi pi-fw pi-search' }
      ]
    }
  ];
}
