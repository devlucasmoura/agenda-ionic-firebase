import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';

export interface Contato {
  id?: string;
  nome: string;
  email: string;
  telefone: string;
  foto?: string;
}

@Injectable({ providedIn: 'root' })
export class ContatosService {
  private firestore = inject(Firestore);

  async listar(): Promise<Contato[]> {
    const ref = collection(this.firestore, 'contatos');
    const snap = await getDocs(ref);
    const dados = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Contato) }));
    console.log('[ContatosService] listar() retornou:', dados);
    return dados;
  }

  async adicionar(contato: Contato) {
    const ref = collection(this.firestore, 'contatos');
    const resultado = await addDoc(ref, contato);
    console.log('[ContatosService] adicionar() criou ID:', resultado.id);
    return resultado;
  }

  async atualizar(id: string, contato: Partial<Contato>) {
    const ref = doc(this.firestore, `contatos/${id}`);
    return updateDoc(ref, contato);
  }

  async excluir(id: string) {
    const ref = doc(this.firestore, `contatos/${id}`);
    return deleteDoc(ref);
  }
}
