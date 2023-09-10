//
const detailPokemon = (pokemon) => {
  return `
  <section class="poke-details ${pokemon.type}">

  
  <div class="container-info">
  
  <div class="background-image">
    <img src="./assets/img/pokeball.svg" alt="pokeball-img" />
  </div>

  <header class="header">
  <span id="closeOpenDetail" class="material-symbols-outlined">
  <span class="material-symbols-outlined"> arrow_circle_left </span>
  </span>
  </header>
  

  <div class="info">
  <h1>${pokemon.name}</h1>
  <span class="info-number">#${pokemon.number
    .toString()
    .padStart(3, '0')}</span>
  </div>
  

  <div class="poke-details">
    <div class="details">
      <div class="typeDetails">
        ${pokemon.types
          .map(
            (type) => `
        <h3 class="type ${type}">${type}</h3>
        `
          )
          .join('')}
      </div>
      <img src="${pokemon.photo}" alt="${pokemon.name}" />
    </div>
</div>

    <div class="about">


      <h2>Base Stats</h2>
      <div class="stats">
        <li>
          <h2>Hp:</h2>
          <h3>${pokemon.stats['hp']}</h3>
          <div class="progress-bar">
          <div class="progress " style="width: ${pokemon.stats['hp']}%"></div>
        </div>
        </li>
        <li>
          <h2>Attack:</h2>
          <h3>${pokemon.stats['attack']}</h3>
          <div class="progress-bar">
          <div class="progress-other" style="width: ${
            pokemon.stats['attack']
          }%"></div>
        </li>

        <li>
          <h2>Defense:</h2>
          <h3>${pokemon.stats['defense']}</h3>
          <div class="progress-bar">
          <div class="progress" style="width: ${
            pokemon.stats['defense']
          }%"></div>
        </li>
        <li>
          <h2>Sp.Atk:</h2>
          <h3>${pokemon.stats['special-attack']}</h3>
          <div class="progress-bar">
          <div class="progress-other" style="width: ${
            pokemon.stats['special-attack']
          }%"></div>
        </li>
        <li>
          <h2>Sp.Def:</h2>
          <h3>${pokemon.stats['special-defense']}</h3>
          <div class="progress-bar">
          <div class="progress" style="width: ${
            pokemon.stats['special-defense']
          }%"></div>
        </li>
        <li>
          <h2>Speed:</h2>
          <h3>${pokemon.stats['speed']}</h3>
          <div class="progress-bar">
          <div class="progress-other" style="width: ${
            pokemon.stats['speed']
          }%"></div>
        </li>
      </div>

      <h2>Abilities:</h2>

      <div class="info-abilities">
      ${pokemon.abilities
        .map(
          (abilities) => `
      <h3>${abilities} </h3>
      `
        )
        .join(' ')}
      </div>
    </div>
  </div>
</section>
  `;
};
//

let scrollPosition = 0;

async function openDetailModal() {
  const openModal = document.getElementById('openDetail');
  const buttons = document.querySelectorAll('.btnOpenDetail');
  scrollPosition = window.scrollY;

  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      openModal.showModal();
      const idParam =
        event.currentTarget.parentNode.querySelector('.number').textContent;
      const id = idParam.replace('#', '');

      pokeApi.getPokemonCardDetail(id).then((pokemon) => {
        const newDetailHtml = detailPokemon(pokemon);
        openModal.innerHTML = newDetailHtml;

        closeModalDetailPokemon();

        document.addEventListener('keydown', (event) => {
          if (event.key === 'Escape' || event.key === 'Esc') {
            openModal.close();
            openModal.innerHTML = '';
            window.scrollTo(0, scrollPosition);
          }
        });
        document.addEventListener('click', (event) => {
          if (event.target === openModal) {
            openModal.close();
            openModal.innerHTML = '';
            window.scrollTo(0, scrollPosition);
          }
        });
      });
    });
  });
}

function closeModalDetailPokemon() {
  const openModal = document.getElementById('openDetail');
  const btnCloseModal = document.getElementById('closeOpenDetail');

  btnCloseModal.addEventListener('click', () => {
    openModal.close();
    openModal.innerHTML = '';
    window.scrollTo(0, scrollPosition);
  });
}
