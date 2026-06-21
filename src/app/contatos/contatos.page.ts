import { Component, inject } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ContatosService, Contato } from '../services/contatos.service';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.page.html',
  styleUrls: ['./contatos.page.scss'],
  standalone: false,
})
export class ContatosPage {
  private contatosService = inject(ContatosService);
  private alertCtrl = inject(AlertController);
  private toastCtrl = inject(ToastController);

  contatos: Contato[] = [];
  carregando = true;

  async ionViewWillEnter() {
    await this.carregar();
  }

  async carregar(event?: any) {
    this.carregando = true;
    try {
      this.contatos = await this.contatosService.listar();
    } catch (e) {
      console.error('[ContatosPage] erro:', e);
      this.mostrarToast('Erro ao carregar contatos', 'danger');
    } finally {
      this.carregando = false;
      if (event) event.target.complete();
    }
  }

  async abrirFormulario(contato?: Contato) {
    const editando = !!contato;
    const alert = await this.alertCtrl.create({
      header: editando ? 'Editar Contato' : 'Novo Contato',
      inputs: [
        { name: 'nome', type: 'text', placeholder: 'Nome', value: contato?.nome || '' },
        { name: 'email', type: 'email', placeholder: 'Email', value: contato?.email || '' },
        { name: 'telefone', type: 'tel', placeholder: 'Telefone', value: contato?.telefone || '' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salvar',
          handler: async (dados) => {
            if (!dados.nome || !dados.email) {
              this.mostrarToast('Nome e email são obrigatórios', 'danger');
              return false;
            }
            try {
              if (editando && contato?.id) {
                await this.contatosService.atualizar(contato.id, dados);
                this.mostrarToast('Contato atualizado', 'success');
              } else {
                await this.contatosService.adicionar(dados);
                this.mostrarToast('Contato criado', 'success');
              }
              await this.carregar();
              return true;
            } catch {
              this.mostrarToast('Erro ao salvar', 'danger');
              return false;
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async confirmarExclusao(contato: Contato) {
    const alert = await this.alertCtrl.create({
      header: 'Excluir contato',
      message: `Deseja excluir ${contato.nome}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: async () => {
            if (!contato.id) return;
            try {
              await this.contatosService.excluir(contato.id);
              this.mostrarToast('Contato excluído', 'success');
              await this.carregar();
            } catch {
              this.mostrarToast('Erro ao excluir', 'danger');
            }
          },
        },
      ],
    });
    await alert.present();
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
