//caching
const pokeCache = {};

const fetchPokemon = async () => {
  //a promise.all, push to stack implementation of the pokemonAPI

  /* try {
    const promises = [];

    //loop through all fetches and push to
    for (let i = 1; i <= 150; i++) {
      // template string to allow for interpolation 
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      promises.push(await fetch(url).then((res) => res.json()));
    }
    //use promise.all to get access to all of the fetch reqq results, in an array in the results object.
    Promise.all(promises).then((results) => {
      const pokemon = results.map((data) => ({
        //need curly braces for object creation here.
        name: data.name,
        id: data.id,
        image: data.sprites["front_default"],
        type: data.types.map((index) => index.type.name).join(", "),
      }));
      displayPokemon(pokemon);
    });
  } catch (error) {
    console.error(error);
  }  */

  //end promise.all implementation
  //cache the information we have already fetched.

  const url = `https://pokeapi.co/api/v2/pokemon/?limit=150`;
  const res = await fetch(url);
  const data = await res.json();
  //console.log(data);
  const pokemon = data.results.map((result, index) => ({
    ...result,
    id: index + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      index + 1
    }.png`,
  }));
  displayPokemon(pokemon);
};

const displayPokemon = (pokemon) => {
  //console.log(pokemon);
  pokemonHTMLString = pokemon
    .map(
      (poke) =>
        `<li class="card" onClick='selectPokemon(${poke.id})'>
    <img  class="card-image" src = "${poke.image}"/>
    <h2 class="card-title">${poke.id}. ${poke.name}</h2>
  </li>`
    )
    .join("");
  //the line to display it onto the screen.
  pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();

const selectPokemon = async (id) => {
  if (!pokeCache[id]) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    pokeCache[id] = data;
    return displayPopup(data);
  }

  displayPopup(pokeCache[id]);
};
const displayPopup = (data) => {
  const type = data.types.map((index) => index.type.name).join(", ");
  const htmlString = `
  <div class="popup">
    <button id="closeBtn" onClick="closePopup()">Close
    </button>
    <div class="card">
    <h2 class="card-title">${data.id}. ${data.name}</h2>
      <img  class="card-image" src = "${data.sprites.front_default}"/>
      
      <p> Height:  ${data.height} |  Weight: ${data.weight} | Type: ${type} </p>
    </div>
  </div>`;
  pokedex.innerHTML = htmlString + pokedex.innerHTML;
};
const closePopup = () => {
  const popup = document.querySelector(".popup");
  popup.parentElement.removeChild(popup);
};

//in arrow functions, if you use curly braces, the return statement is necessary. Without the curly braces it is implicit and already assumed, therefore not required.

//instead of putting a fetch request in a for loop to go through each of them indiviaually, we can use promise.all() to run them all in parallel instead of one after another.

//can use .innerHTML on any id to add html dynamically into your
