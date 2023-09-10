// const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const pokemonDetail = document.getElementById('pokeDetails');

const maxRecords = 2000;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number
              .toString()
              .padStart(3, '0')}</span>
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

function footer() {
  const footer = document.getElementById('footer');

  const div = document.createElement('div');
  const p = document.createElement('p');
  const small = document.createElement('small');
  const span = document.createElement('span');
  const a = document.createElement('a');
  const aGit = document.createElement('a');

  div.classList.add('copyright');

  small.innerText = 'Set/2023  ';

  a.target = '_blank';
  a.href = 'https://www.linkedin.com/in/toledomg/';
  a.innerText = '</ToledoDev>';

  aGit.href = 'https://portfolio.luchost.com/';
  aGit.innerText = '  BootCamp Santander';

  p.append(small);

  small.append(span, aGit);
  span.appendChild(a);
  div.appendChild(p);

  footer.appendChild(div);

  return footer;
}

// footer();

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
