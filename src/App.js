import React, { Component } from 'react'
import {HashRouter as Router,Route,Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Navbar from './components/layout/navbar'
import dashboard from './components/layout/dashboard'
import pokemon from './components/pokemon/pokemon';

class App extends Component {
  render(){
  return (
    <Router>
    <div className="App">
      <Navbar/>
      <div className="container">
      <Switch>
        <Route exact path="/"component={dashboard}/>
        <Route exact path="/pokemon/:pokemonIndex" component={pokemon}/>
      </Switch>
      </div>
    </div>
    </Router>
  )
}
}

export default App;
