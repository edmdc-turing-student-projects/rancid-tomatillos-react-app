import React from "react";
import PropTypes from "prop-types";
import Movie from "../Movie/Movie.js";
import "./Movies.css";
import emptyStar from "../../empty-Star.png"
import filledStar from "../../Filled-Star.png"
import { Link } from "react-router-dom";
import { findMovieRating } from "../../utils";

const Movies = ({ movies, ratings, userId, toggleFavorite }) => {
  const favoriteStatus = (movie) => {
    return movie.isFavorite ? (
      <button
        type="image"
        className="starIcon active"
        onClick={(event) => toggleFavorite(event)}
      >
        <img src={filledStar} alt="favorited movie"/>
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

Movies.propTypes = {
  movies: PropTypes.array,
  userId: PropTypes.number,
  toggleFavorite: PropTypes.func,
  movie_id: PropTypes.number,
  comments: PropTypes.array,
  findComments: PropTypes.func,
};
