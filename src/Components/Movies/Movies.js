import React from "react";
import Movie from "../Movie/Movie.js";
import "./Movies.css";
import emptyStar from "../../empty_start.png"
import { Link } from "react-router-dom";
import { findMovieRating } from "../../utils";

const Movies = ({ movies, ratings, userId, toggleFavorite }) => {
  const favoriteStatus = (movie) => {
    return movie.isFavorite ? (
      <button
        className="starIcon active"
        onClick={(event) => toggleFavorite(event)}
      >
        <img src={emptyStar} alt="favorited movie"/>
      </button>
    ) : (
      <button
        className="starIcon"
        onClick={(event) => toggleFavorite(event)}
      >
        <img src={emptyStar} alt="not a favorited movie"/>
      </button>
    )
  }
  const movieResults = movies.map((movie, index) => {
    return (
      <li id={movie.id} key={index} title={movie.title}>
        {userId ? favoriteStatus(movie) : null}
        <Link to={`/movies/${movie.id}`}>
          <Movie
            title={movie.title}
            posterPath={movie.poster_path}
            backdropPath={movie.backdrop_path}
            averageRating={movie.average_rating}
            releaseDate={movie.release_date}
          />
        </Link>
        {(ratings) ? findMovieRating(ratings, movie, userId) : null}
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
