import React, { Component } from "react";
import "./App.css";
import Movies from "./Components/Movies/Movies";
import LogIn from "./Components/LogIn/LogIn"

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: {},
      error: "",
    };
    this.url = "https://rancid-tomatillos.herokuapp.com/api/v2";
  }

  componentDidMount() {
    const requestUrl = `${this.url}/movies`;
    return fetch(requestUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error({ ...response });
        }
      })
      .then((movies) => {
        this.setState({ movies: movies.movies, error: "" });
      })
      .catch(error => this.setState({error: error}))
  }

  postUser = (userInfo) => {
    const requestUrl = `${this.url}/login`;
    return fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error ({...response})
        }
      })
      .then(user => {
        this.setState({user: {...user}})
        alert('Successful Login!')
      })
      .catch(error => this.setState({error: error}))
  }

  render() {
    return (
      <section>
        <h2> Rancid Tomatillos </h2>
        <LogIn postUser={this.postUser}/>
        {this.state.movies && <Movies movies={this.state.movies} />}
      </section>
    );
  }
}

export default App;
