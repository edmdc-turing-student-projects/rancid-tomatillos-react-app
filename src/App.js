import React, { Component } from "react";
import "./App.css";
import Movies from "./Components/Movies/Movies";
import LogIn from "./Components/LogIn/LogIn";
import MovieMainPage from "./Components/MovieMainPage/MovieMainPage";
import { Route, Switch, Link } from "react-router-dom";

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
        console.log(response);

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
            {!this.state.user.email &&(
              <Link to="/login" className="nav">
                Log In
              </Link>
            )}
            {this.state.user.email && "Log Out"}
          </button>
          <button>
            <Link to="/movies/:id">
              MovieMainPage
            </Link>
          </button>
        </nav>
        <Switch>
            <Route exact path="/">
              {this.state.movies && <Movies movies={this.state.movies} />}
          </Route>
          <Route exact path="/login">
            <LogIn postUser={this.postUser} />
          </Route>
          <Route
            path="/movies/:id" 
            exact
            render={({ match }) => {
              const { id } = match.params;
              const movieToRender = this.state.movies.find(movie => movie.id === parseInt(id))
              console.log(movieToRender);
              
              return null //<Movies {...movieToRender}/>
            }}
          />
            {/* <MovieMainPage selectMovie={ this.selectMovie}/> */}
          {/* </Route> */}
        </Switch>
      </section>
    );
  }
}
export default App;

