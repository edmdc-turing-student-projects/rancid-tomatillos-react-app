import React, { Component } from "react";
import "./App.css";
import Movies from "./Components/Movies/Movies";
import LogIn from "./Components/LogIn/LogIn";
import { Route, Link, Redirect } from "react-router-dom";
import MovieMainPage from "./Components/MovieMainPage/MovieMainPage";
import { getAllMovies, loginUser, movieRatingsRequests } from "./apiCalls";

class App extends Component {
  constructor({user = {}}) {
    super();
    this.state = {
      movies: [],
      user: user,
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

    getMoviesRequest();

    if (this.state.user.id) {
      const getUserMovieRatings = async () => {
        try {
          const ratings = await movieRatingsRequests(this.state.user.id)
          console.log(ratings)
          this.setState({...ratings})
        } catch (error) {
          this.setState({ error: error });
        }
      }
      return getUserMovieRatings();
    }
  }

  // componentDidUpdate() {
  //  if (this.state.user.id) {
  //     const getUserMovieRatings = async () => {
  //       try {
  //         const ratings = await movieRatingsRequests(this.state.user.id)
  //         console.log(ratings)
  //         this.setState({...ratings})
  //       } catch (error) {
  //         this.setState({ error: error });
  //       }
  //     }
  //     return getUserMovieRatings();
  //   }
  // }

  postUser = async (userCredentials) => {
    try {
      const { user } = await loginUser(userCredentials);
      this.setState({ user: user });
      localStorage.setItem('user', JSON.stringify(user))
      this.setState({error: ""})
      return this.state.user.name;
    } catch (error) {
      this.setState({ error: "Incorrect Email/Password" });
      return this.state.error;
    }
  };

  logOutUser = (event) => {
    event.preventDefault();
    if (event.target.innerHTML === "Log Out") {
      this.setState({
        user: {},
      });
      localStorage.clear();
    }
  };

  render() {
    return (
      <main className="App">

        <section className="header">
          <Link className="headerTitle" to="/">
            {!this.state.user.name ? (<h1>Rancid Tomatillos</h1>) :
              (<>
                <h1 className="title">Rancid Tomatillos</h1>
                <h3 aria-label="Welcome Banner">{`Welcome, ${this.state.user.name}!`}</h3>
              </>)
            }
          </Link>
          <nav className="navBar">
            {this.state.user.name ? (
              <button className="navBar" onClick={(event) => this.logOutUser(event)}>
                Log Out
              </button>
            ) : (
              <Link className="navBar" to="/login">
                <button>Log In!</button>
              </Link>
            )}
            <Link className="navBar" to="/">
              <button>Home</button>
            </Link>
          </nav>
        </section>

        <Route
          exact
          path="/movies/:id"
          render={({ match }) => {
            const { id } = match.params;
            const movie2Render = this.state.movies.find(
              (movie) => movie.id === parseInt(id)
            );
            return <MovieMainPage {...movie2Render} rootUrl={this.url} ratings={this.state.ratings} />;
          }}
        ></Route>

        <Route exact path="/login">
          <LogIn postUser={this.postUser} />
        </Route>

        <Route
          exact
          path='/user/:id'>
          <Movies movies={this.state.movies} ratings={this.state.ratings} userId={this.state.user.id} />
          {!this.state.user.name && <Redirect to="/" />}
        </Route>

        <Route exact path="/">
          {this.state.user.name && <Redirect to={`/user/${this.state.user.id}`} />}
          {this.state.movies && <Movies movies={this.state.movies} />}
        </Route>

      </main>
    );
  }
}

export default App;
