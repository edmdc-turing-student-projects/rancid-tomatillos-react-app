import React, { Component } from "react";
import "./App.css";
import Movies from "./Components/Movies/Movies";
import LogIn from "./Components/LogIn/LogIn";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

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
    const getMoviesRequest = async () => {
      try {
        const response = await fetch(requestUrl);
        let movies;

        if (response.ok) {
          movies = await response.json();
          this.setState({ movies: movies.movies, error: "" });
        } else {
          throw new Error({ ...response });
        }
      } catch (error) {
        this.setState({ error: error });
      }
    };
    return getMoviesRequest();
  }

  postUser = (userCredentials) => {
    const requestUrl = `${this.url}/login`;
    const userLoginCredentials = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(userCredentials),
    };
    const loginUser = async () => {
      try {
        const response = await fetch(requestUrl, userLoginCredentials);
        let userInfo;
        if (response.ok) {
          userInfo = await response.json();
          this.setState({ user: userInfo.user });
        } else {
          throw new Error({ ...response });
        }
      } catch (error) {
        this.setState({ error: error });
      }
    };
    return loginUser();
  };

  logOut(event) {
    event.preventDefault();
    if (event.target.innerHTML === "Log Out") {
      this.setState({
        user: {},
      });
    }
  }

  render() {
    return (
      <section>
        <h2> Rancid Tomatillos </h2>
        <nav>
          <button onClick={(event) => this.logOut(event)}>
            {!this.state.user.email && (
              <Link to="/login" className="nav">
                Log In
              </Link>
            )}
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
