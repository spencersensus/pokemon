import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import PctyButton from '@pcty/react-button';
import PctyCard from '@pcty/react-card';

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = { Pokemon: [], loading: true };
  }

  getPokemon = (event) => {
    let url = "";
    if(event){
      console.log(event);
      url = "https://pokeapi.co/api/v2/pokemon/"+event+"/";
    }
    else{
    console.log("inside Pokemon");
    url = "https://pokeapi.co/api/v2/pokemon/1/";
    }
    let settings = {
      "async": true,
      "crossDomain": true,
      url,
      "method": "GET",
      "headers": {},
      "data": "{}"
    }
    $.ajax(settings).done((response) => {
      console.log(response);
      this.setState({ Pokemon: response, loading: false });
    });
  }

  componentDidMount() {
    console.log("mounting");
    this.getPokemon();
  }
  handlePrev = () => {
    let currentId = this.state.Pokemon.id;
    let nextId;
    if(currentId >1){
      nextId = currentId-1;
    }
    else{
      nextId = currentId;
    }
    console.log("state", this.state.Pokemon.id)
    console.log("next", nextId);
    this.getPokemon(nextId);
  }
  handleNext = () => {
    let currentId = this.state.Pokemon.id;
    let nextId = currentId+1;
    console.log("state", this.state.Pokemon.id)
    console.log("next", nextId);
    this.getPokemon(nextId);
  }

  renderPokemon = (pokemon) => {
    let pokemonId = pokemon.id;
    let pokemonTypeArray = pokemon.types;
    console.log("Types",pokemonTypeArray);
    let header = () => {
      return (
        <div className = "headerInfo">
          <p className = "pokemonName">{pokemon.species.name}</p>
          {pokemonTypeArray.map(type => 
            <p className = "pokemonType">{type.type.name} </p>
          )}
        </div>
      );
    }
    return (
      <div className = "col-md-3 col-sm-3 mx-auto pokemonCard">
        <PctyCard header= {header()} onClickHeader={() => console.log('Linked Card Header CLICKED!!!')}>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`} alt="Pokemon" />
          <p className = "baseExperience">
          {pokemon.base_experience}
          </p>
        </PctyCard>
      </div>
    );
  }


  render() {
    const Pokemon = !(this.state.loading) && this.state.Pokemon && this.renderPokemon(this.state.Pokemon);
    return (
      <div>
        {Pokemon}
        <div className = "paginationButtons">
        <PctyButton buttonType="button" className = "prevButton" onClick={() => this.handlePrev()}>Previous</PctyButton>
        <PctyButton buttonType="button" className = "nextButton" onClick={() => this.handleNext()}>Next</PctyButton>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <h1>Pokemon</h1>
      <Pokemon />
    </div>
  );
}

export default App;
