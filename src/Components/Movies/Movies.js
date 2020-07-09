import React from "react";
import Movie from "../Movie/Movie.js";
import "./Movies.css";
import { Link } from "react-router-dom";
import MovieRatingForm from "../MovieRatingForm/MovieRatingForm"

const Movies = ({ movies, ratings, userId }) => {
  const findMovieRating = (movie) => {
    if (!ratings.length) return <MovieRatingForm userId={userId} movieId={movie.id}/>
    const movieRating = ratings.find( rating => movie.id === rating.movie_id)
    return (movieRating) ? <h5> Rating </h5> : <MovieRatingForm movieId={movie.id}/>
  }

  const movieResults = movies.map((movie, index) => {
    return (
      <li id={movie.id} key={index}>
        <Link to={`/movies/${movie.id}`}>
          <Movie
            title={movie.title}
            posterPath={movie.poster_path}
            backdropPath={movie.backdrop_path}
            averageRating={movie.average_rating}
            releaseDate={movie.release_date}
          />
        </Link>
        {(ratings) ? findMovieRating(movie) : null}
      </li>
    );
  });

  return (
    <section data-testid="movies-section">
      <ul>{movieResults.length && movieResults}</ul>
    </section>
  );
};

export default Movies;
