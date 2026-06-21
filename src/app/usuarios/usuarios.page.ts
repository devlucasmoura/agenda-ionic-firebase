import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { ContatosService, Contato } from '../services/contatos.service';

interface UsuarioApi {
  name: { first: string; last: string };
  email: string;
  phone: string;
  picture: { thumbnail: string; medium: string };
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
  standalone: false,
})
export class UsuariosPage implements OnInit {
  private http = inject(HttpClient);
  private contatosService = inject(ContatosService);
  private toastCtrl = inject(ToastController);

  usuarios: UsuarioApi[] = [];
  carregando = false;

  ngOnInit() {
    this.buscarUsuarios();
  }

  buscarUsuarios(event?: any) {
    this.carregando = true;
    this.http
      .get<{ results: UsuarioApi[] }>('https://randomuser.me/api/?results=10&nat=br')
      .subscribe({
        next: (res) => {
          this.usuarios = res.results;
          this.carregando = false;
          if (event) event.target.complete();
        },
        error: () => {
          this.carregando = false;
          this.mostrarToast('Erro ao buscar usuários', 'danger');
          if (event) event.target.complete();
        },
      });
  }

  async adicionarAosContatos(usuario: UsuarioApi) {
    const contato: Contato = {
      nome: `${usuario.name.first} ${usuario.name.last}`,
      email: usuario.email,
      telefone: usuario.phone,
    };
    try {
      await this.contatosService.adicionar(contato);
      this.mostrarToast('Contato salvo!', 'success');
    } catch {
      this.mostrarToast('Erro ao salvar contato', 'danger');
    }
  }

  private async mostrarToast(mensagem: string, cor: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 1500,
      color: cor,
      position: 'top',
    });
    await toast.present();
  }
}
