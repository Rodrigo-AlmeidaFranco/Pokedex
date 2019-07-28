import React, { Component } from 'react'
import PokemonList from '../pokemon/pokemonList'

export default class dashboard extends Component {
    render() {
        return (
            <div className="row">
                <div className="col">
                    <PokemonList/>
                </div>
            </div>
        )
    }
}
