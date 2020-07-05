import React from "react";
import Movie from "../Movie/Movie.js";
import "./Movies.css";

const Movies = ({ movies }) => {
  const movieResults = movies.map((movie, index) => {
    return (
      <li id={movie.id} key={index}>
        <Movie
          title={movie.title}
          posterPath={movie.poster_path}
          backdropPath={movie.backdrop_path}
          averageRating={movie.average_rating}
          releaseDate={movie.release_date}
        />
      </li>
    );
  });

  return (
    <section>
      <ul>{movieResults.length && movieResults}</ul>
    </section>
  );
};

export default Movies;
