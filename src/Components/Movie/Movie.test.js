import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Movie from "./Movie";

describe("Movie", () => {
  it("should show a portion of the movie's info", () => {
    const { getByText, getByAltText, container } = render(
      <Movie
        posterPath="https://image.tmdb.org/t/p/original//tI8ocADh22GtQFV28vGHaBZVb0U.jpg"
        title="Artemis Fowl"
        averageRating="5"
        releaseDate="2020-06-12"
      />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <article>
          <figure>
            <div
              class="movieCard"
            >
              <img
                alt="Artemis Fowl movie poster"
                class="movieImg"
                src="https://image.tmdb.org/t/p/original//tI8ocADh22GtQFV28vGHaBZVb0U.jpg"
              />
            </div>
            <figcaption>
              <h4>
                Artemis Fowl
              </h4>
              <p>
                Released on June 11, 2020
              </p>
              <p>
                5
              </p>
            </figcaption>
          </figure>
        </article>
      </div>
    `);
  });
});
