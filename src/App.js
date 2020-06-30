import React, { Component } from 'react';
import './App.css';
import Movies from './Components/Movies/Movies'

class App extends Component {
  constructor () {
    super();
    this.state = {
      movies: []
    }
    this.url = 'https://rancid-tomatillos.herokuapp.com/api/v2'
  }

  getAllMovies = () => {
    const requestUrl = `${this.url}/movies`
    return fetch(requestUrl)
      .then(response => {
        console.log(response)
        if (response.ok) {
          return response.json()
        } else {
          throw new Error({...response})
        }
      })
      .then(movies => {
        console.log(movies)
        this.setState({movies: movies, error: ''})
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <section>
        <h2> Rancid Tomatillos </h2>
        <Movies movies={this.state.movies} getAllMovies/>
      </section>
    )
  }
}



export default App;
