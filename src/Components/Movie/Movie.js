import React from "react";
import "./Movie.css";
import UserReviews from "../UserReviews/UserReviews"


const Movie = ({ posterPath, title, averageRating, releaseDate, userId }) => {
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
          <UserReviews userId={userId} />
        </figcaption>
      </figure>
    </article>
  );
};

export default Movie;
