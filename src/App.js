import React, { Component } from 'react';
import './App.css';
import Movies from './Components/Movies/Movies'

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      error: '',
    }
    this.url = 'https://rancid-tomatillos.herokuapp.com/api/v2'
  }

  componentDidMount() {
    const requestUrl = `${this.url}/movies`
    return fetch(requestUrl)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error({...response})
        }
      })
      .then(movies => {
        console.log(movies, "in promise")
        this.setState({movies: movies.movies, error: ''})
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <section>
        <h2> Rancid Tomatillos </h2>
        {this.state.movies && <Movies movies={this.state.movies}/>}
      </section>
    )
  }
}



export default App;
