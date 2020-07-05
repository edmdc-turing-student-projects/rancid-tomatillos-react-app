import React from "react";
import "./Movie.css";

const Movie = ({ posterPath, title, averageRating, releaseDate }) => {
  const formatDate = (releaseDate) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const formattedDate = new Date(releaseDate).toLocaleString(
      "en-US",
      options
    );

    return `Released on ${formattedDate}`;
  };

  return (
    <article>
      <figure>
        <div>
          <img alt={`${title} movie poster`} src={posterPath} />
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
