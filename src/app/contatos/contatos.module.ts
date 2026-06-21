import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ContatosPage } from './contatos.page';
import { ContatosPageRoutingModule } from './contatos-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ContatosPageRoutingModule],
  declarations: [ContatosPage],
})
export class ContatosPageModule {}
