import React from "react";
import "./Movie.css";
import { formatDate } from "../../utils";


const Movie = ({ posterPath, title, averageRating, releaseDate }) => {
  return (
    <article>
      <figure>
        <div>
          <img alt={`${title} movie poster`} src={posterPath} className="all-movies"/>
        </div>
        <figcaption>
          <h4>{title}</h4>
          <p>{formatDate(releaseDate)}</p>
          <p>{averageRating}</p>
        </figcaption>
      </figure>
    </article>
  );
};

export default Movie;
