import PokemonService from "./PokemonService.js";

let _pokemonService = new PokemonService()

function drawPokemon() {
  let pokemonElem = document.querySelector('#pokemon')
  let pokemon = _pokemonService.Pokemon
  let template = ''
  pokemon.forEach(p => template += `
  <button class="col-2 btn btn-outline-info m-3" onclick="app.controllers.pokemonController.getSelectedPokemon('${p.name}')">${p.name}</button>
  `
  )
  pokemonElem.innerHTML = template
}

function drawSelectedPokemon() {
  let selectedElem = document.querySelector('#selected-pokemon')
  let selectedPokemon = _pokemonService.SelectedPokemon
  selectedElem.innerHTML = selectedPokemon.Template
  console.log('draw selected', selectedPokemon)
}

function drawSavedPokemon() {
  let savedPokemonElem = document.querySelector('#saved-pokemon')
  let savedPokemon = _pokemonService.SavedPokemon
  let template = ''
  savedPokemon.forEach(p => {
    template += p.Template
  })
  savedPokemonElem.innerHTML = template
}

export default class PokemonController {
  constructor() {
    _pokemonService.addSubscriber("pokemon", drawPokemon)
    _pokemonService.addSubscriber("selectedPokemon", drawSelectedPokemon)
    _pokemonService.addSubscriber("savedPokemon", drawSavedPokemon)
    _pokemonService.getPokemon()
    _pokemonService.getSavedPokemon()
  }

  getSelectedPokemon(name) {
    _pokemonService.getSelectedPokemon(name)
  }

  savePokemon() {
    _pokemonService.savePokemon()
  }

  deletePokemon(id) {
    _pokemonService.deletePokemon(id)
  }
}