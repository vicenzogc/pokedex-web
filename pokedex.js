 function fazerRequisicao() {
            let id = document.getElementById('pokemonInput').value;

            fetch('https://pokeapi.co/api/v2/pokemon/' + id)
                .then(response => {
                    console.log('RESPONSE:');
                    console.log(response);
                    return response.json();
                })
                .then(data => {
                    console.log('DATA:');
                    console.log(data);

                    document.getElementById('id').innerText = data.id;
                    document.getElementById('name').innerText = data.name;
                    document.getElementById('sprite').src = data.sprites.other.dream_world.front_default;
                })
                .catch(error => console.error('Erro:', error));
        }

        function mais() {
            let input = document.getElementById('pokemonInput');
            let valorAtual = parseInt(input.value) || 0;
            input.value = valorAtual + 1;
            fazerRequisicao()
        }

        function menos() {
            let input = document.getElementById('pokemonInput');
            let valorAtual = parseInt(input.value) || 0;
            input.value = valorAtual - 1;
            fazerRequisicao()
        }

async function carregarPokemons() {
    const container = document.getElementById('cards-container');
    container.innerHTML = "Carregando...";

    try {
        const resposta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const dados = await resposta.json();

        container.innerHTML = "";

        for (let pokemon of dados.results) {
            const res = await fetch(pokemon.url);
            const data = await res.json();

            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <p>#${data.id}</p>
                <p>${data.name}</p>
            `;

            container.appendChild(card);
        }

    } catch (erro) {
        console.error("Erro ao carregar Pokémons:", erro);
    }
}

carregarPokemons();