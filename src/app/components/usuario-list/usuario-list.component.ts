import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule] 
})
export class UsuarioListComponent implements OnInit {

  usuarios: any[] = [];
  nome: string = '';
  cpf: string = '';
  uf: string = '';
  ufs: string[] = [
    'AC - Acre', 
    'AL - Alagoas', 
    'AP - Amapá', 
    'AM - Amazonas', 
    'BA - Bahia', 
    'CE - Ceará', 
    'DF - Distrito Federal', 
    'ES - Espírito Santo', 
    'GO - Goiás', 
    'MA - Maranhão', 
    'MT - Mato Grosso', 
    'MS - Mato Grosso do Sul', 
    'MG - Minas Gerais', 
    'PA - Pará', 
    'PB - Paraíba', 
    'PR - Paraná', 
    'PE - Pernambuco', 
    'PI - Piauí', 
    'RJ - Rio de Janeiro', 
    'RN - Rio Grande do Norte', 
    'RS - Rio Grande do Sul', 
    'RO - Rondônia', 
    'RR - Roraima', 
    'SC - Santa Catarina', 
    'SP - São Paulo', 
    'SE - Sergipe', 
    'TO - Tocantins'
  ];
  ufInput: string = '';
  filteredUfs: string[] = [];
  editIndex: number | null = null;
  ufsopen: boolean = false;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe((data: any[]) => {
      this.usuarios = data;
    });
  }
//  Salvando i atualizando 
  saveUsuario(): void {
    const usuario = {
      nome: this.nome,
      cpf: this.cpf,
      uf: this.uf
    };

    if (this.editIndex === null) {
      this.usuarioService.saveUsuario(usuario).subscribe(() => {
        this.loadUsuarios();
        this.clearForm();
      });
    } else {
      const usuarioId = this.usuarios[this.editIndex].id;
      this.usuarioService.updateUsuario(usuarioId, usuario).subscribe(() => {
        this.loadUsuarios();
        this.clearForm();
      });
    }
  }

  editUsuario(index: number): void {
    const usuario = this.usuarios[index];
    this.nome = usuario.nome;
    this.cpf = usuario.cpf;
    this.uf = usuario.uf;
    this.editIndex = index;
  }

  deleteUsuario(id: number): void {
    this.usuarioService.deleteUsuario(id).subscribe(() => {
      this.loadUsuarios();
    });
  }
  clearForm(): void {
    this.nome = '';
    this.cpf = '';
    this.uf = '';
    this.editIndex = null;
  }

  filterUfs(): void {
    const searchTerm = this.uf.toLowerCase();
    if (searchTerm) {
      this.filteredUfs = this.ufs.filter(uf => uf.toLowerCase().includes(searchTerm));
    } else {
      this.filteredUfs = this.ufs;
    }
  }

  selectUf(uf: string): void {
    this.uf = uf; 
    this.filteredUfs = []; 
    this.ufsopen = false; 
  }

  showAllUfs(): void {
    this.filteredUfs = this.ufs; 
  }

  
  hideUfs(): void {
    setTimeout(() => {
      this.filteredUfs = []; 
      this.ufsopen = false; 
    }, 100); 
  }

  toggleUfs(): void {
    this.ufsopen = !this.ufsopen; 
  }
}