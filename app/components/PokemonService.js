import Pokemon from "../models/Pokemon.js";

let pokeAPI = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon/'
})

let bcwAPI = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/Sean/pokemon'
})

let _state = {
  pokemon: [],
  savedPokemon: [],
  selectedPokemon: {}
}

let _subscribers = {
  pokemon: [],
  savedPokemon: [],
  selectedPokemon: []
}

function setState(propName, data) {
  _state[propName] = data
  _subscribers[propName].forEach(fn => fn())
}

export default class PokemonService {

  get Pokemon() {
    return _state.pokemon.map(p => p)
  }

  get SelectedPokemon() {
    return new Pokemon(_state.selectedPokemon)
  }

  get SavedPokemon() {
    return _state.savedPokemon.map(p => new Pokemon(p))
  }

  addSubscriber(propName, fn) {
    _subscribers[propName].push(fn)
  }

  getPokemon() {
    pokeAPI.get()
      .then(res => {
        console.log("All pokemon request", res.data)
        setState("pokemon", res.data.results)
      })
      .catch(err => console.error(err))
  }

  getSelectedPokemon(name) {
    pokeAPI.get(name)
      .then(res => {
        console.log("Selected pokemon request", res)
        setState('selectedPokemon', res.data)
      })
      .catch(err => console.error(err))
  }

  savePokemon() {
    bcwAPI.post('', this.SelectedPokemon)
      .then(res => {
        console.log(res.data.message)
        this.getSavedPokemon()
      })
      .catch(err => console.error(err))
  }
  getSavedPokemon() {
    bcwAPI.get()
      .then(res => {
        console.log("Gets saved pokemon", res.data.data)
        setState('savedPokemon', res.data.data)
      })
      .catch(err => console.error(err))
  }

  deletePokemon(id) {
    bcwAPI.delete(id)
      .then(res => {
        console.log(res.data.message)
        this.getSavedPokemon()
      })
      .catch(err => console.error(err))
  }
}