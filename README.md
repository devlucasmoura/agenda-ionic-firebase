# Agenda de Contatos - Ionic + Firebase

Aplicativo mobile simples desenvolvido com **Ionic + Angular + Firebase** que permite consumir uma API REST de usuarios e gerenciar uma lista de contatos pessoais com CRUD completo no Firestore.

## Funcionalidades

- **Pagina Usuarios**: lista 10 pessoas aleatorias consumindo a API publica [randomuser.me](https://randomuser.me)
- **Pagina Contatos**: CRUD completo (Criar, Listar, Editar e Excluir) com dados salvos no Firebase Firestore
- Adicionar usuarios da API direto na lista de contatos
- Navegacao por abas (tabs)

## Tecnologias

- [Ionic 8](https://ionicframework.com/)
- [Angular 20](https://angular.dev/)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)
- [AngularFire](https://github.com/angular/angularfire)

## Como rodar

```bash
# Instalar dependencias
npm install

# Iniciar o servidor de desenvolvimento
ionic serve
```

O app abre em `http://localhost:8100`.

## Estrutura

```
src/app/
├── usuarios/    # Pagina que consome a API REST
├── contatos/    # Pagina de CRUD no Firebase
├── services/    # Service de comunicacao com Firestore
└── tabs/        # Navegacao por abas
```
## Autor

**Lucas da Silva de Moura**  
Estudante de Análise e Desenvolvimento de Sistemas
