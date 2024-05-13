# Kanban de tarefas - Ticket King

## Descrição

Neste projeto você deve criar um webapp de controle de tarefas usando Next.js:

-   Next.js: https://nextjs.org/
-   SASS modules: https://sass-lang.com/documentation/modules
-   Typescript: https://www.typescriptlang.org/
-   Prisma: https://www.prisma.io/
-   SQLite: https://www.prisma.io/docs/orm/overview/databases/sqlite

Recomendamos que você use o [Yarn](https://yarnpkg.com/) para instalar as dependências e rodar o projeto.

## Design

Você deve seguir o design criado por
Kemdirim Akujuobi [Dribbble do projeto](https://dribbble.com/shots/17095376-Kanban-board)

### Tela principal

![App de tarefas](./assets/app.png 'App de tarefas')

### Modal de adicionar uma lista

O campo de create subtask adiciona uma tarefa a lista.

Obs.: Nesta tela você pode ignorar o campo "Move to another list", ele não é necessário.
![Modal de lista](./assets/modal.png 'Modal adicionar uma lista')

## Requisitos

Na implementação das rotas de API você deve usar o [zod](https://zod.dev/) para validar os dados recebidos

O usuário deve ser capaz de:

-   Adicionar uma lista
    -   A descrição é opcional e deve aparecer logo abaixo do título da lista (no design não tem descrição mas você deve adicionar com uma fonte menor no cabeçalho do card da lista)
-   Adicionar uma tarefa a uma lista
-   Marcar uma tarefa como concluída
-   Excluir uma tarefa
-   Excluir uma lista
-   Editar o nome de uma lista (clicando no nome da lista)
-   Editar o nome de uma tarefa (clicando no nome da tarefa)
-   Adicionar uma data limite para a tarefa ser concluída

EXTRA:

-   Buscar tarefas
-   Arrastar e soltar tarefas entre listas
-   Arrastar e soltar tarefas para reordenar
-   Arrastar e soltar listas para reordenar

## Banco de dados

Use o Prisma para criar um banco de dados SQLite com as seguintes tabelas, caso ache necessário, você pode adicionar mais campos e tabelas:

### List

-   id: String (cuid)
-   title: String
-   description: String?
-   tasks: Task[]
-   createdAt: DateTime
-   updatedAt: DateTime

### Task

-   id: String (cuid)
-   title: String
-   completedAt: DateTime
-   finishUntil: DateTime?
-   listId: String
-   list: List
-   createdAt: DateTime
-   updatedAt: DateTime

## Desafios

-   Adicionar autenticação com [Auth.js](https://authjs.dev/)
-   Adicionar um sistema de notificações para tarefas com data limite
-   Adicionar [microinterações](https://www.thedevelobear.com/post/microinteractions/) para conclusão de uma lista, use o [react-rewards](https://www.npmjs.com/package/react-rewards) por exemplo.
-   Adicionar um sistema de compartilhamento de listas
-   Adicionar um sistema de notificações para compartilhamento de listas

## Entrega

Você deve clonar este repositório no Github e nos enviar o link do seu repositório.
