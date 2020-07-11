import React, { Component } from "react";
import MovieRatingForm from "../MovieRatingForm/MovieRatingForm"
import "./MovieMainPage.css";
import { getSingleMovieInfo } from "../../apiCalls";


class MovieMainPage extends Component {
  componentDidMount() {
    const getMovieDetails = async () => {
      try {
        const movieDetails = await getSingleMovieInfo(this.props.id);
        this.setState({ ...movieDetails });
      } catch (error) {
        this.setState({ ...error });
      }
    };
    return getMovieDetails();
  }

  findMovieRating (movie)  {
    if (!this.props.ratings.length) return <MovieRatingForm userId={this.props.ratings.user_id} movieId={movie.id}/>
    const movieRating = this.props.ratings.find( rating => movie.id === rating.movie_id)
    return (movieRating) ? <MovieRatingForm userId={this.props.ratings.user_id} movieId={movie.id} userRating={movieRating}/> : <MovieRatingForm userId={this.props.ratings.user_id} movieId={movie.id} />
  }

  render() {    
    return (
      <section id="single-movie">
        {this.state && (
          <section>
            <figure id="figure-container">
              <img
                className="movie-image"
                src={this.state.movie.backdrop_path}
                alt={`Backdrop for ${this.state.movie.title}`}
              />
              <section className="movie-info">
                <h3>{this.state.movie.title}</h3>
                <h4 className="tagline">{this.state.movie.tagline}</h4>
                <p><strong>Overview:</strong> <br></br> {this.state.movie.overview}</p>
                <p><strong>Release Data:</strong> <br></br> {this.state.movie.release_date}</p>
                <p><strong>Genre(s):</strong> <br></br> {(this.state.movie.genres).join(', ')}</p>
                <p><strong>Budget</strong>: <br></br> ${(this.state.movie.budget).toLocaleString('en')}</p>
                <p><strong>Revenue:</strong> <br></br> ${(this.state.movie.revenue).toLocaleString('en')}</p>
                <p><strong>Runtime:</strong> <br></br> {this.state.movie.runtime} Minutes</p>
                <p><strong>Average Rating:</strong> <br></br> {Math.round(this.state.movie.average_rating)}</p>
                {(this.props.ratings) ? this.findMovieRating(this.state.movie) : null}
              </section>
            </figure>
          </section>
        )}
      </section>
    );
  }
}

export default MovieMainPage;
