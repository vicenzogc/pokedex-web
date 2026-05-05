# Pokédex Web 🐾

Este projeto é uma enciclopédia virtual de Pokémon (Pokédex) que consome dados em tempo real da [PokeAPI](https://pokeapi.co/). [cite_start]Ele foi desenvolvido como parte de um desafio técnico para avaliar habilidades em desenvolvimento web front-end sem o uso de frameworks[cite: 48, 49].

## 🚀 Funcionalidades

De acordo com os requisitos do projeto, o sistema permite:

- [cite_start]**Listagem Dinâmica:** Carrega uma lista inicial de Pokémon diretamente da API [cite: 52-54].
- [cite_start]**Navegação:** Botões de "Próxima página" e "Página anterior" para explorar toda a lista[cite: 55].
- [cite_start]**Busca em Tempo Real:** Campo de busca para localizar um Pokémon específico pelo nome ou ID[cite: 56].
- [cite_start]**Detalhes Completos:** Ao clicar em um card, um modal exibe imagem, nome, ID, tipos, altura e peso [cite: 57-62].
- [cite_start]**Sistema de Favoritos:** Possibilidade de favoritar e desfavoritar Pokémon, com os dados persistidos no navegador via `localStorage`[cite: 63].
- [cite_start]**Filtro de Favoritos:** Botão exclusivo para visualizar apenas os seus Pokémon preferidos[cite: 63].
- [cite_start]**Interface Responsiva:** Layout que se adapta perfeitamente a dispositivos móveis e desktops[cite: 65, 76].
- [cite_start]**Feedback ao Usuário:** Mensagens visuais de "Carregando...", "Erro" ou "Nenhum resultado encontrado"[cite: 64, 75].

## 🛠️ Tecnologias Utilizadas

[cite_start]Para garantir um código limpo e focado nos fundamentos, utilizamos[cite: 49, 77]:

- **HTML5:** Estrutura semântica.
- **CSS3:** Estilização moderna utilizando Flexbox, Grid e variáveis CSS para o tema.
- **JavaScript (Vanilla):** Lógica de manipulação do DOM, consumo de API assíncrona (`fetch` e `async/await`) e armazenamento local.

## 📂 Estrutura de Arquivos

[cite_start]O projeto está organizado da seguinte forma[cite: 81]:
- `index.html`: Estrutura principal e modais.
- `style.css`: Toda a identidade visual e regras de responsividade.
- `script.js`: Toda a inteligência da aplicação (chamadas de API e manipulação de dados).
- `README.md`: Documentação do projeto.

## 🏁 Como Rodar o Projeto

[cite_start]Não é necessário instalar nenhuma dependência ou servidor pesado[cite: 82]:

1. Faça o download ou clone este repositório.
2. Localize o arquivo `index.html` na pasta raiz.
3. Abra-o em qualquer navegador web moderno (Chrome, Edge, Firefox, Safari).

---
*Projeto desenvolvido seguindo as diretrizes do documento "Projeto: Pokédex Web".*
