import React, { Component } from "react";
import "./App.css";
import Movies from "./Components/Movies/Movies";
import LogIn from "./Components/LogIn/LogIn";
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

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
        this.setState({user: user.user})
        // alert('Successful Login!')
      })
      .catch(error => this.setState({error: error}))
  }

  logOut(event) {
    event.preventDefault();
    if(event.target.innerHTML === 'Log Out') {
      this.setState({
        user: {}
      });
    };
  }

  render() {
    return (
      <section>
        <h2> Rancid Tomatillos </h2>
        <nav>
          <button onClick={event => this.logOut(event)}>          
            {!this.state.user.email && <Link to="/login" className="nav">Log In</Link> }
            {this.state.user.email && "Log Out"}
          </button>
        </nav>
          <Switch>
            <Route exact path="/">
              {this.state.movies && <Movies movies={this.state.movies} />}
            </Route>
            <Route exact path="/login">
              <LogIn postUser={this.postUser} />
            </Route>
          </Switch>
      </section>
    );
  }
}

export default App;
