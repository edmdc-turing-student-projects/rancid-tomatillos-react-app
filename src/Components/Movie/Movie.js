import React from "react";
import PropTypes from "prop-types";
import "./Movie.css";
import { formatDate } from "../../utils";


const Movie = ({ posterPath, title, averageRating, releaseDate }) => {
  return (
    <article>
      <figure>
        <div className="movieCard">
          <img className="movieImg" alt={`${title} movie poster`} src={posterPath} />
        </div>
        <figcaption>
          <h4>{title}</h4>
          <p>{formatDate(releaseDate)}</p>
          <p>Average Rating: {Math.round(averageRating)} / 10</p>
        </figcaption>
      </figure>
    </article>
  );
};

export default Movie;

Movie.propTypes = {
  posterPath: PropTypes.string,
  title: PropTypes.string,
  averageRating: PropTypes.number,
  releaseDate: PropTypes.string,
  formatDate: PropTypes.func,
};