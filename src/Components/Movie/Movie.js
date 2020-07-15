import React from "react";
import "./Movie.css";
import { formatDate } from "../../utils";


const Movie = ({ posterPath, title, averageRating, releaseDate }) => {
  return (
    <article>
      <h4>{title}</h4>
      <figure>
        <div className="movieCard">
          <img className="movieImg" alt={`${title} movie poster`} src={posterPath} />
        </div>
        <figcaption>
          <p>{formatDate(releaseDate)}</p>
          <p>Public Rating:{averageRating.toFixed(2)}</p>
        </figcaption>
      </figure>
    </article>
  );
};

export default Movie;
