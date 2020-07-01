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
      <h4>{title}</h4>
      <p>{formatDate(releaseDate)}</p>
      <img alt={`${title} movie poster`} src={posterPath} />
      <li>{averageRating}</li>
    </article>
  );
};

export default Movie;

