import React from "react";
import Movie from "../Movie/Movie.js";
import "./Movies.css";
import { Link } from "react-router-dom";
import { findMovieRating } from "../../utils";

const Movies = ({ movies, ratings, userId }) => {
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
