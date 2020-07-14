// import MutationObserver from '@sheerun/mutationobserver-shim'
// window.MutationObserver = MutationObserver
import React from "react";
import MovieMainPage from "./MovieMainPage";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getSingleMovieInfo, getComments, movieRatingsRequests } from "../../apiCalls"
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
          "average_rating": 5
        }
      }
    )

    getComments.mockResolvedValue(
      {
        "comments": [
          {
            "id": 1,
            "author": "Aang",
            "comment": "Great movie!",
            "movie_id": 475430
          },
          {
            "id": 2,
            "author": "Katara",
            "comment": "Not good. They need to quit making these movies",
            "movie_id": 522938
          },
        ]
      }
    )

    movieRatingsRequests.mockResolvedValue(
      {
        "ratings": [
          {
            "id": 1238,
            "user_id": 58,
            "movie_id": 475430,
            "rating": 6,
            "created_at": "2020-07-11T22:16:45.999Z",
            "updated_at": "2020-07-11T22:16:45.999Z"
          },
          {
            "id": 1335,
            "user_id": 58,
            "movie_id": 508439,
            "rating": 7,
            "created_at": "2020-07-13T00:28:56.421Z",
            "updated_at": "2020-07-13T00:28:56.421Z"
          },
        ]
      }
    )

    const movie2Render = {
      average_rating: 5,
      backdrop_path: "https://image.tmdb.org/t/p/original//o0F8xAt8YuEm5mEZviX5pEFC12y.jpg",
      id: 475430,
      poster_path: "https://image.tmdb.org/t/p/original//tI8ocADh22GtQFV28vGHaBZVb0U.jpg",
      release_date: "2020-06-12",
      rootUrl: "https://rancid-tomatillos.herokuapp.com/api/v2",
      title: "Artemis Fowl"
    }

    const comments2Render =  [{
      "id": 1,
      "author": "Aang",
      "comment": "Great movie!",
      "movie_id": 475430
    }]

    const ratings2Render = [{
      "id": 1238,
      "user_id": 58,
      "movie_id": 475430,
      "rating": 6,
      "created_at": "2020-07-11T22:16:45.999Z",
      "updated_at": "2020-07-11T22:16:45.999Z"
    }]

    const { getByText, getByAltText} = render(
    <MovieMainPage {...movie2Render} 
      rootUrl="https://rancid-tomatillos.herokuapp.com/api/v2/movies/475430"
      ratings={ratings2Render}
      comments={comments2Render}
     />);
    
    const movieTitle = await waitFor(() => getByText('Artemis Fowl'))
    const movieTagline = await waitFor(() => getByText('Remember the name'))
    const movieOverview= await waitFor(() => getByText('Artemis Fowl is a 12-year-old genius and descendant of a long line of criminal masterminds. He soon finds himself in an epic battle against a race of powerful underground fairies who may be behind his father\'s disappearance.'));
    const movieReleaseDate = await waitFor(() => getByText('Released on June 11, 2020'));
    const movieGenres = await waitFor(() => getByText('Adventure, Fantasy, Science Fiction, Family'));
    const movieBudget = await waitFor(() => getByText('$125,000,000'));
    const movieRevenue = await waitFor(() => getByText('$0'));
    const movieRuntime = await waitFor(() => getByText('95 Minutes'));
    const movieAltText = await waitFor(() => getByAltText('Backdrop for Artemis Fowl'));
    const movieAvgRating = await waitFor(() => getByText('5'));
    const movieUserRating = await waitFor(() => getByText('6'));
    const movieComment = await waitFor(() => getByText('Great movie!'));

    expect(movieTitle).toBeInTheDocument();
    expect(movieTagline).toBeInTheDocument();
    expect(movieOverview).toBeInTheDocument();
    expect(movieReleaseDate).toBeInTheDocument();
    expect(movieGenres).toBeInTheDocument();
    expect(movieBudget).toBeInTheDocument();
    expect(movieRevenue).toBeInTheDocument();
    expect(movieRuntime).toBeInTheDocument();
    expect(movieAvgRating).toBeInTheDocument();
    expect(movieAltText).toBeInTheDocument();
    expect(movieUserRating).toBeInTheDocument();
    expect(movieComment).toBeInTheDocument();
  });

  it('should show movie rating form if a user has not rated a movie', async () => {
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
           "average_rating": 5
         }
       }
     )
 
     getComments.mockResolvedValue(
       {
         "comments": [
           {
             "id": 1,
             "author": "Aang",
             "comment": "Great movie!",
             "movie_id": 475430
           },
           {
             "id": 2,
             "author": "Katara",
             "comment": "Not good. They need to quit making these movies",
             "movie_id": 522938
           },
         ]
       }
     )
 
     movieRatingsRequests.mockResolvedValue(
       {
         "ratings": [
           {
             "id": 1238,
             "user_id": 58,
             "movie_id": 475430,
             "rating": 6,
             "created_at": "2020-07-11T22:16:45.999Z",
             "updated_at": "2020-07-11T22:16:45.999Z"
           },
           {
             "id": 1335,
             "user_id": 58,
             "movie_id": 508439,
             "rating": 7,
             "created_at": "2020-07-13T00:28:56.421Z",
             "updated_at": "2020-07-13T00:28:56.421Z"
           },
         ]
       }
     )
 
     const movie2Render = {
       average_rating: 5,
       backdrop_path: "https://image.tmdb.org/t/p/original//o0F8xAt8YuEm5mEZviX5pEFC12y.jpg",
       id: 475430,
       poster_path: "https://image.tmdb.org/t/p/original//tI8ocADh22GtQFV28vGHaBZVb0U.jpg",
       release_date: "2020-06-12",
       rootUrl: "https://rancid-tomatillos.herokuapp.com/api/v2",
       title: "Artemis Fowl"
     }
 
     const comments2Render =  [{
       "id": 1,
       "author": "Aang",
       "comment": "Great movie!",
       "movie_id": 475430
     }]
 
     const ratings2Render = [{
       "id": 1238,
       "user_id": 58,
       "movie_id": 603,
       "rating": 6,
       "created_at": "2020-07-11T22:16:45.999Z",
       "updated_at": "2020-07-11T22:16:45.999Z"
     }]
 
     const { getByRole} = render(
     <MovieMainPage {...movie2Render} 
       rootUrl="https://rancid-tomatillos.herokuapp.com/api/v2/movies/475430"
       ratings={ratings2Render}
       comments={comments2Render}
      />);
    
      const movieComment = await waitFor(() => getByRole('button', {name: 'Submit Review'}));
      expect(movieComment).toBeInTheDocument();
  })
});
