import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import necessário para [(ngModel)]

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule] // Adicionando CommonModule e FormsModule
})
export class UsuarioListComponent implements OnInit {

  usuarios: any[] = [];
  nome: string = '';
  cpf: string = '';
  uf: string = '';
  ufs: string[] = ['SP', 'RJ', 'MG', 'ES'];
  editIndex: number | null = null; // Controla se estamos editando

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  // Carrega os usuários da API
  loadUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe((data: any[]) => {
      this.usuarios = data;
    });
  }

  // Salva ou atualiza um usuário
  saveUsuario(): void {
    const usuario = {
      nome: this.nome,
      cpf: this.cpf,
      uf: this.uf
    };

    if (this.editIndex === null) {
      // Adicionar novo usuário
      this.usuarioService.saveUsuario(usuario).subscribe(() => {
        this.loadUsuarios();
        this.clearForm();
      });
    } else {
      // Atualizar usuário existente
      const usuarioId = this.usuarios[this.editIndex].id;
      this.usuarioService.updateUsuario(usuarioId, usuario).subscribe(() => {
        this.loadUsuarios();
        this.clearForm();
      });
    }
  }

  // Preenche o formulário para edição
  editUsuario(index: number): void {
    const usuario = this.usuarios[index];
    this.nome = usuario.nome;
    this.cpf = usuario.cpf;
    this.uf = usuario.uf;
    this.editIndex = index;
  }

  // Exclui um usuário
  deleteUsuario(id: number): void {
    this.usuarioService.deleteUsuario(id).subscribe(() => {
      this.loadUsuarios();
    });
  }

  // Limpa o formulário e reseta o estado de edição
  clearForm(): void {
    this.nome = '';
    this.cpf = '';
    this.uf = '';
    this.editIndex = null;
  }
}
