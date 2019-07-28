import React, { Component } from 'react'
import axios from 'axios'

const TYPE_COLORS = {
    bug: 'B1C12E',
    dark: '4f3a2d',
    dragon:'755edf',
    eletric:'fcbc17',
    fairy:'f481f4',
    fighthing:'823551d',
    fire:'e7380c',
    flying:'a383f7',
    ghost:'6060b2',
    grass:'74c236',
    ground:'d38357',
    ice:'a3e7fd',
    normal:'c8c4bc',
    poison:'934594',
    psychic:'ed4882',
    rock:'b9a156',
    steel:'b5b5c3',
    water:'3295f6'
}


export default class pokemon extends Component {
    state = {
        name :'',
        pokemonIndex : '',
        imgUrl : '',
        types: [],
        description: '',
        stats:{
            hp:'',
            attack:'',
            defense:'',
            speed:'',
            specialAttack:'',
            specialDefense:''  
        },
        height:'',
        weight:'',
        eggGroup:'',
        abilities:'',
        genderRatioMale:'',
        genderRatioFemale:'',
        evs :''
    }

    async componentDidMount(){
        const {pokemonIndex} = this.props.match.params;

        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
        const pokemonEspeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

        const pokemonRes = await axios.get(pokemonUrl)
        const name = pokemonRes.data.name;
        const imgUrl = pokemonRes.data.sprites.front_default;

        let[hp,attack,defense,speed,specialAttack,specialDefense] = '';

        pokemonRes.data.stats.map(stat=>{
            switch(stat.stat.name){
                case 'hp':
                hp = stat['base_stat'];
                break;
                case 'attack':
                attack = stat['base_stat'];
                break;
                case 'defense':
                defense = stat['base_stat'];
                break;
                case 'speed':
                speed = stat['base_stat'];
                break
                case 'special-attack':
                specialAttack = stat['base_stat'];
                break
                case 'special-defense':
                specialDefense = stat['base_stat'];
                break
            }
        })

const height = pokemonRes.data.height;
const weight = pokemonRes.data.weight;
const types = pokemonRes.data.types.map(type =>{return type.type.name})
const abilities = pokemonRes.data.abilities.map(ability =>{
    return ability.ability.name.toLowerCase()
    .split('-').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
})
const evs = pokemonRes.data.stats.filter(stat =>{
    if(stat.effort > 0){
        return true
    }
    return false
}).map(stat =>{
    return `${stat.effort} ${stat.stat.name.toLowerCase()
        .split('-')
        .map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}`
    
}).join(', ');

this.setState({
    imgUrl,
    pokemonIndex,
    name,
    types,
    stats:{
        hp,
        attack,
        defense,
        specialAttack,
        specialDefense,
        speed
    },
    height,
    weight,
    abilities,
    evs,
})

await axios.get(pokemonEspeciesUrl).then(res =>{
    let description = '';
    res.data.flavor_text_entries.some(flavor =>{
        if(flavor.language.name === 'en'){
            description = flavor.flavor_text;
            console.log(description)
            return;
        }
    })

    const hatchSteps = 255 *(res.data['hatch_counter']+1);
this.setState({
    description
})
})


        
    }
    render() {
        
        return (
            <div className="col">
            <div className="card">
            <div className="card-header">
                        <div className="row">
                            <div className="col-5">
                            <h5>{this.state.pokemonIndex}</h5>
                            </div>
                                <div className="col-7">
                                <div className="float-right">
                                {this.state.types.map( type =>{
                                   return  <span key={type} className="badge badge-primary badge-pill mr-1"
                                   style={{backgroundColor:`#${TYPE_COLORS[type]}`,
                                    color:'white'}}>
                                        {type.split('-').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}
                                    </span>
                                })}
                                </div>
                                </div>
                        </div>
            </div>
            <div className="card-body">
            <div className="row align-items-center">
            <div className="col-md-3">
                <img 
                src={this.state.imgUrl}
                className="card-img-top rounded mx-auto mt-2"/>
                </div>
            <div className="col-md-9">
                        <h4 className="mx-auto">
                        {this.state.name.toLowerCase().split('-').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}
                        </h4>
                        <div className="row align-items-center">
            <div className="col-12 col-md-3">HP</div>
            <div className="col-12 ">
                        <div className="progress">
                        <div className="progress-bar"
                        role="progressBar"
                        style={{
                            width:`${this.state.stats.hp}%`
                        }}
                  
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        ><small>{this.state.stats.hp}</small></div>
                        </div>
                        </div>
            </div>
            <div className="row align-items-center">
            <div className="col-12 col-md-3">Attack</div>
            <div className="col-12 ">
                        <div className="progress">
                        <div className="progress-bar"
                        role="progressBar"
                        style={{
                            width:`${this.state.stats.attack}%`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        ><small>{this.state.stats.attack}</small></div>
                        </div>
                        </div>
            </div>
            <div className="row align-items-center">
            <div className="col-12 col-md-3">Defense</div>
            <div className="col-12 ">
                        <div className="progress">
                        <div className="progress-bar"
                        role="progressBar"
                        style={{
                            width:`${this.state.stats.defense}%`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        ><small>{this.state.stats.defense}</small></div>
                        </div>
                        </div>
            </div>
            <div className="row align-items-center">
            <div className="col-12 col-md-3">Special Attack</div>
            <div className="col-12 ">
                        <div className="progress">
                        <div className="progress-bar"
                        role="progressBar"
                        style={{
                            width:`${this.state.stats.specialAttack}%`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        ><small>{this.state.stats.specialAttack}</small></div>
                        </div>
                        </div>
            </div>
            <div className="row align-items-center">
            <div className="col-12 col-md-3">Special Defense</div>
            <div className="col-12 ">
                        <div className="progress">
                        <div className="progress-bar"
                        role="progressBar"
                        style={{
                            width:`${this.state.stats.specialDefense}%`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        ><small>{this.state.stats.specialDefense}</small></div>
                        </div>
                        </div>
            </div>
            <div className="row align-items-center">
            <div className="col-12 col-md-3">Speed</div>
            <div className="col-12 ">
                        <div className="progress">
                        <div className="progress-bar"
                        role="progressBar"
                        style={{
                            width:`${this.state.stats.speed}%`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        ><small>{this.state.stats.speed}</small></div>
                        </div>
                        </div>
            </div>
            </div>
            <div className="row mt-1">
            <div className="col">
            <p className="p-2">{this.state.description}</p>
            </div>
            </div>
            <div>
                </div>
            </div>
            </div>
            <hr/>
            <div className="card-body">
            <h5 className="card-title text-center">Profile</h5>
            <div className="row">
            <div className="col-md-6">
            <div className="row">
            <div className="col-md-6">
            <h6 className="float-right">Height:</h6>
            </div>
            <div className="col-md-6">
            <h6 className="float-left">{this.state.height} MT</h6>
            </div>
            </div>
            <div className="row">
            <div className="col-md-6">
            <h6 className="float-right">Weight:</h6>
            </div>
            <div className="col-md-6">
            <h6 className="float-left">{this.state.weight} KG</h6>
            </div>
            </div>
            <div className="row">
            <div className="col-md-6">
            <h6 className="float-right">Abilities:</h6>
            </div>
            <div className="col-md-6">
            <h6 className="float-left">{this.state.abilities}</h6>
            </div>
            </div>
            <div className="row">
            <div className="col-md-6">
            <h6 className="float-right">Ev's:</h6>
            </div>
            <div className="col-md-6">
            <h6 className="float-left">{this.state.evs}</h6>
            </div>
            </div>
            </div>
            </div>
            </div>
            <div className="card-footer text-muted">
            Data From{' '}<a
                href="https://poekapi.co/"
                target="_blank"
                className="card-link"
                >PokeApi.co
            </a>
            </div>
            </div>
            </div>
            
        )
    }
}
