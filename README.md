# Pokédex Web 🐾

Este projeto é uma enciclopédia virtual de Pokémon (Pokédex) que consome dados em tempo real da [PokeAPI](https://pokeapi.co/). Solicitado pelo Professor Josin 
## 🚀 Funcionalidades

De acordo com os requisitos do projeto, o sistema permite:

- **Listagem Dinâmica:** Carrega uma lista inicial de Pokémon diretamente da API.
- **Navegação:** Botões de "Próxima página" e "Página anterior" para explorar toda a lista.
- **Busca em Tempo Real:** Campo de busca para localizar um Pokémon específico pelo nome ou ID.
- **Detalhes Completos:** Ao clicar em um card, um modal exibe imagem, nome, ID, tipos, altura e peso.
- **Sistema de Favoritos:** Possibilidade de favoritar e desfavoritar Pokémon, com os dados persistidos no navegador via `localStorage`.
- **Filtro de Favoritos:** Botão exclusivo para visualizar apenas os seus Pokémon preferidos.
- **Interface Responsiva:** Layout que se adapta perfeitamente a dispositivos móveis e desktops.
- **Feedback ao Usuário:** Mensagens visuais de "Carregando...", "Erro" ou "Nenhum resultado encontrado".

## 🛠️ Tecnologias Utilizadas

Para garantir um código limpo e focado nos fundamentos, utilizamos:

- **HTML5:** Estrutura semântica.
- **CSS3:** Estilização moderna utilizando Flexbox, Grid e variáveis CSS para o tema.
- **JavaScript (Vanilla):** Lógica de manipulação do DOM, consumo de API assíncrona (`fetch` e `async/await`) e armazenamento local.

## 📂 Estrutura de Arquivos

O projeto está organizado da seguinte forma:
- `index.html`: Estrutura principal e modais.
- `style.css`: Toda a identidade visual e regras de responsividade.
- `script.js`: Toda a inteligência da aplicação (chamadas de API e manipulação de dados).
- `README.md`: Documentação do projeto.

## 🏁 Como Rodar o Projeto

Não é necessário instalar nenhuma dependência ou servidor pesado:

1. Faça o download ou clone este repositório.
2. Localize o arquivo `index.html` na pasta raiz.
3. Abra-o em qualquer navegador web

