// const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const pokemonDetail = document.getElementById('pokeDetails');

const maxRecords = 2000;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `

  
  <li class="pokemon ${pokemon.type}">  
  <div class="background-img">
    <img src="./assets/img/pokeball.svg" alt="pokeball-img" />
  </div>            
  <span class="number">#${pokemon.number.toString().padStart(3, '0')}</span>
    <span class="name">${pokemon.name}</span>         
          <div class="detail">
          <ol class="types">
          ${pokemon.types
            .map((type) => `<li class="type ${type}">${type}</li>`)
            .join('')}
            </ol>
            
            <img src="${pokemon.photo}"
            alt="${pokemon.name}">
            </div>
            <button  id="btnOpenDetail" class="btnOpenDetail">Info</button>
        </li>
        
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join('');
    pokemonList.innerHTML += newHtml;
    openDetailModal();
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
