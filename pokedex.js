// Configurações Globais
const API_URL = 'https://pokeapi.co/api/v2/pokemon';
const limit = 20; // Quantidade por página
let offset = 0;
let isShowingFavorites = false;
let currentList = []; 
let favorites = JSON.parse(localStorage.getItem('pokedex_favorites')) || [];

// Elementos do DOM
const grid = document.getElementById('pokedexGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const favoritesBtn = document.getElementById('favoritesBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const statusMessage = document.getElementById('statusMessage');
const pagination = document.getElementById('pagination');

// Elementos do Modal
const modal = document.getElementById('pokemonModal');
const closeModal = document.getElementById('closeModal');
const modalFavBtn = document.getElementById('modalFavBtn');
let currentPokemon = null;

// Inicializa a Pokedex
document.addEventListener('DOMContentLoaded', () => {
    loadPokemons();
});

// 1. Busca e Lista Pokémons (Paginação)
async function loadPokemons(resetOffset = false) {
    if (resetOffset) offset = 0;
    isShowingFavorites = false;
    favoritesBtn.innerHTML = '⭐ Mostrar Favoritos';
    pagination.classList.remove('hidden');
    
    showStatus('Carregando Pokémons...', false);
    grid.innerHTML = '';

    try {
        const response = await fetch(`${API_URL}?offset=${offset}&limit=${limit}`);
        if (!response.ok) throw new Error('Erro na requisição');
        
        const data = await response.json();
        
        // Pega os detalhes de cada pokemon retornado na página
        const detailedPokemons = await Promise.all(
            data.results.map(async (pokemon) => {
                const res = await fetch(pokemon.url);
                return res.json();
            })
        );

        currentList = detailedPokemons;
        hideStatus();
        renderGrid(currentList);
        updatePaginationButtons();

    } catch (error) {
        showStatus('Erro ao carregar os Pokémons. Tente novamente.', true);
        console.error(error);
    }
}

// 2. Renderiza a grade de cards
function renderGrid(pokemonArray) {
    grid.innerHTML = '';
    
    if (pokemonArray.length === 0) {
        showStatus('Nenhum Pokémon encontrado.', false);
        return;
    }

    pokemonArray.forEach(pokemon => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // Verifica se é favorito
        const isFav = favorites.some(fav => fav.id === pokemon.id);
        
        // Usa a imagem de alta qualidade (official-artwork) se existir
        const imgUrl = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;

        card.innerHTML = `
            ${isFav ? '<div class="fav-icon">⭐</div>' : ''}
            <img src="${imgUrl}" alt="${pokemon.name}">
            <p class="id">#${pokemon.id.toString().padStart(3, '0')}</p>
            <h3>${pokemon.name}</h3>
        `;
        
        // Clicar no card abre os detalhes
        card.onclick = () => openModal(pokemon);
        grid.appendChild(card);
    });
}

// 3. Busca específica (por Nome ou ID)
async function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) {
        loadPokemons(true);
        return;
    }

    isShowingFavorites = false;
    pagination.classList.add('hidden');
    showStatus('Buscando...', false);
    grid.innerHTML = '';

    try {
        const response = await fetch(`${API_URL}/${query}`);
        if (!response.ok) throw new Error('Não encontrado');
        
        const data = await response.json();
        currentList = [data];
        hideStatus();
        renderGrid(currentList);
        
    } catch (error) {
        showStatus('Nenhum Pokémon encontrado com este nome ou ID.', true);
    }
}

// 4. Lógica de Paginação
function updatePaginationButtons() {
    prevBtn.disabled = offset === 0;
}

prevBtn.onclick = () => {
    if (offset >= limit) {
        offset -= limit;
        loadPokemons();
    }
};

nextBtn.onclick = () => {
    offset += limit;
    loadPokemons();
};

// 5. Exibir Detalhes no Modal
function openModal(pokemon) {
    currentPokemon = pokemon;
    modal.classList.remove('hidden');

    const imgUrl = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    
    document.getElementById('modalImg').src = imgUrl;
    document.getElementById('modalName').textContent = pokemon.name;
    document.getElementById('modalId').textContent = `#${pokemon.id.toString().padStart(3, '0')}`;
    
    // A API retorna altura em decímetros e peso em hectogramas. Precisamos converter:
    document.getElementById('modalHeight').textContent = (pokemon.height / 10).toFixed(1); 
    document.getElementById('modalWeight').textContent = (pokemon.weight / 10).toFixed(1); 

    // Renderiza os tipos dinamicamente com cores
    const typesHtml = pokemon.types.map(t => 
        `<span class="type-badge ${t.type.name}">${t.type.name}</span>`
    ).join('');
    document.getElementById('modalTypes').innerHTML = typesHtml;

    updateModalFavButtonState();
}

// Fechar Modal
closeModal.onclick = () => {
    modal.classList.add('hidden');
    // Atualiza a grid principal para exibir/esconder a estrela alterada
    if (isShowingFavorites) {
        renderGrid(favorites);
    } else {
        renderGrid(currentList);
    }
};

window.onclick = (event) => {
    if (event.target === modal) closeModal.onclick();
};

// 6. Lógica de Favoritos (LocalStorage)
function updateModalFavButtonState() {
    const isFav = favorites.some(fav => fav.id === currentPokemon.id);
    if (isFav) {
        modalFavBtn.innerHTML = '⭐ Favorito';
        modalFavBtn.classList.add('active');
    } else {
        modalFavBtn.innerHTML = '🤍 Favoritar';
        modalFavBtn.classList.remove('active');
    }
}

modalFavBtn.onclick = () => {
    const index = favorites.findIndex(fav => fav.id === currentPokemon.id);
    
    if (index > -1) {
        // Remove dos favoritos
        favorites.splice(index, 1);
    } else {
        // Adiciona aos favoritos (salvamos o objeto inteiro para não precisar dar Fetch na aba de favoritos)
        favorites.push(currentPokemon);
    }
    
    localStorage.setItem('pokedex_favorites', JSON.stringify(favorites));
    updateModalFavButtonState();
};

// 7. Mostrar Apenas Favoritos
favoritesBtn.onclick = () => {
    if (isShowingFavorites) {
        loadPokemons(true); // Volta para a tela principal
    } else {
        isShowingFavorites = true;
        favoritesBtn.innerHTML = '⬅️ Voltar para Lista';
        pagination.classList.add('hidden');
        hideStatus();
        renderGrid(favorites);
    }
};

// Mensagens de Status Visual
function showStatus(message, isError) {
    statusMessage.textContent = message;
    statusMessage.classList.remove('hidden');
    statusMessage.style.color = isError ? '#d32f2f' : '#666';
}

function hideStatus() {
    statusMessage.classList.add('hidden');
}

// Evento de "Enter" na barra de busca
searchBtn.onclick = handleSearch;
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});
