// import MutationObserver from '@sheerun/mutationobserver-shim'
// window.MutationObserver = MutationObserver
import React from "react";
import MovieMainPage from "./MovieMainPage";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getSingleMovieInfo } from "../../apiCalls"
jest.mock("../../apiCalls")


describe('MovieMainPage', () => {
  it('should show a movie\'s info on load', async () => {
    getSingleMovieInfo.mockResolvedValue(
     { "movie": {
          "id": 475430,
          "title": "Artemis Fowl",
          "poster_path": "https://image.tmdb.org/t/p/original//   tI8ocADh22GtQFV28vGHaBZVb0U.jpg",
          "backdrop_path": "https://image.tmdb.org/t/p/original//   o0F8xAt8YuEm5mEZviX5pEFC12y.jpg",
          "release_date": "2020-06-12",
          "overview": "Artemis Fowl is a 12-year-old genius and     descendant of a long line of criminal masterminds. He soon    finds himself in an epic battle against a race of powerful    underground fairies who may be behind his father's   disappearance.",
          "genres": [
          "Adventure",
          "Fantasy",
          "Science Fiction",
          "Family"
          ],
          "budget": 125000000,
          "revenue": 0,
          "runtime": 95,
          "tagline": "Remember the name",
          "average_rating": 6.333333333333333
          }
       }
    )

    const movie2Render = {
      average_rating: 5.5,
      backdrop_path: "https://image.tmdb.org/t/p/original//o0F8xAt8YuEm5mEZviX5pEFC12y.jpg",
      id: 475430,
      poster_path: "https://image.tmdb.org/t/p/original//tI8ocADh22GtQFV28vGHaBZVb0U.jpg",
      release_date: "2020-06-12",
      rootUrl: "https://rancid-tomatillos.herokuapp.com/api/v2",
      title: "Artemis Fowl"
    }

    const { findByText } = render(<MovieMainPage {...movie2Render} rootUrl="https://rancid-tomatillos.herokuapp.com/api/v2/movies/475430" />);
    
    const movieInfo = await waitFor(() => findByText('Artemis Fowl is a 12-year-old genius and descendant of a long line of criminal masterminds. He soon finds himself in an epic battle against a race of powerful underground fairies who may be behind his father\'s disappearance.'));

    expect(movieInfo).toBeInTheDocument();

  })
});
