import React, { Component } from "react";
import "./App.css";
import Movies from "./Components/Movies/Movies";
import LogIn from "./Components/LogIn/LogIn";
import { Route, Switch, Link } from "react-router-dom";
import MovieMainPage from "./Components/MovieMainPage/MovieMainPage";
import { getAllMovies, loginUser } from "./apiCalls";

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
    const getMoviesRequest = async () => {
      try {
        let movies = await getAllMovies();
        this.setState({ movies: movies.movies, error: "" });
      } catch (error) {
        this.setState({ error: error });
      }
    };
    return getMoviesRequest();
  }

  postUser = async (userCredentials) => {
    try {
      const { user } = await loginUser(userCredentials);
      this.setState({ user: user });
    } catch (error) {
      this.setState({ error: error });
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
            {this.state.movies && <Movies movies={this.state.movies} />}
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
