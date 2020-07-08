import React, { Component } from "react";
import "./App.css";
import Movies from "./Components/Movies/Movies";
import LogIn from "./Components/LogIn/LogIn";
import { Route, Switch, Link } from "react-router-dom";
import MovieMainPage from "./Components/MovieMainPage/MovieMainPage";

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

  postUser = async (userCredentials) => {
    const requestUrl = `${this.url}/login`;
    const loginRequest = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(userCredentials),
    };
    try {
      const response = await fetch(requestUrl, loginRequest);
      let userInfo;
  
      if (response.ok) {
        userInfo = await response.json();
        this.setState({ user: userInfo.user });
      } else {
        console.log(response)
        throw new Error({ ...response });
      }
    } catch(error) {
      this.setState({error: error});
    }
  };

  logOut = (event) => {
    event.preventDefault();
    if (event.target.innerHTML === "Log Out") {
      this.setState({
        user: {},
      });
    }
  };

  render() {
    return (
      <section>
        <h2> Rancid Tomatillos </h2>
        <nav>
          {this.state.user.email ? (
            <button onClick={(event) => this.logOut(event)}>Log Out</button>
          ) : (
            <Link to="/login">
              <button>Log In!</button>
            </Link>
          )}
        </nav>
        <Switch>
          <Route exact path="/">
            {this.state.movies && <Movies movies={this.state.movies} userId={this.state.user.id} />}
          </Route>
          <Route 
            exact 
            path="/user/:id"
          >
          </Route> 
          <Route exact path="/login">
            <LogIn postUser={this.postUser} />
          </Route>
          <Route
            exact
            path="/movies/:id"
            render={({ match }) => {
              const { id } = match.params;
              const movie2Render = this.state.movies.find(
                (movie) => movie.id === parseInt(id)
              );
              return <MovieMainPage {...movie2Render} rootUrl={this.url} />;
            }}
          ></Route>
        </Switch>
      </section>
    );
  }
}

export default App;
