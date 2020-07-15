import React, { Component } from "react";
import "./App.css";
import Movies from "./Components/Movies/Movies";
import LogIn from "./Components/LogIn/LogIn";
import { Route, Link, Redirect } from "react-router-dom";
import MovieMainPage from "./Components/MovieMainPage/MovieMainPage";
import { getAllMovies,
        loginUser,
        movieRatingsRequests,
        getComments,
        getAllFavorites,
        toggleFavorites} from "./apiCalls";

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
        const { movies } = await getAllMovies();

        if (this.state.user.id) {
          const {favorites} = await getAllFavorites()
          const formatedMovieData = movies.map(movie => {
            return (favorites.find(favorite => favorite.movieId === movie.id)) ?
              ({...movie, isFavorite: true}) : ({...movie, isFavorite: false})
          })
          this.setState({movies: formatedMovieData});
        } else {
          this.setState({movies})
        }

      } catch (error) {
        this.setState({ error: error });
      }
    };

    const getMovieComments = async () => {
      try {
        const commentDetails = await getComments();
        this.setState({...commentDetails});
      } catch(error) {
        this.setState({ error: error });
      }
    };


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

      getMoviesRequest();
      getMovieComments();
      getUserMovieRatings();

      }
    }


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
      this.setState({ user: {} });
      localStorage.clear();
    }
  };

  toggleFavoriteFlick = async (event) => {
    const movieId = parseInt(event.target.closest('li').id)
    const selectedFlick = this.state.movies.find(movie => movie.id === movieId)
    const {add2FavoriteMovie, unfavoriteMovie} = toggleFavorites(selectedFlick.id, this.state.user.id)

    const toggleMovieStatus = (newStatus) => {
      const stateMoviesCopy = [...this.state.movies ]
      for(let movie of stateMoviesCopy) {
        if(movie.id === movieId) {
          movie.isFavorite = newStatus
        }
      }
      return stateMoviesCopy
    }

    try {
      if (selectedFlick.isFavorite) {
        const modifiedMovieState = toggleMovieStatus(false)
        this.setState({movies: modifiedMovieState})
        return await unfavoriteMovie();
      } else {
        const modifiedMovieState = toggleMovieStatus(true)
        this.setState({movies: modifiedMovieState})
        return await add2FavoriteMovie();
      }
    } catch (error) {
      console.error({error})
    }
  }

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
            return <MovieMainPage {...movie2Render} rootUrl={this.url} ratings={this.state.ratings} comments={this.state.comments} userId={this.state.user.id}/>;
          }}
        ></Route>

        <Route exact path="/login">
          <LogIn postUser={this.postUser} />
        </Route>

        <Route
          exact
          path='/user/:id'>
          <Movies
            movies={this.state.movies}
            ratings={this.state.ratings}
            userId={this.state.user.id}
            toggleFavorite={this.toggleFavoriteFlick}
          />
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
