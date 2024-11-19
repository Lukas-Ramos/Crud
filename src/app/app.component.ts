import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Importando o RouterModule
import { UsuarioListComponent } from './components/usuario-list/usuario-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [UsuarioListComponent, RouterModule]  // Adicionando RouterModule
})
export class AppComponent {
  title = 'Angular CRUD';
}
