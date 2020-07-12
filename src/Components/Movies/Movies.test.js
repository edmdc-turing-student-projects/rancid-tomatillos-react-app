import React from 'react';
import { render } from '@testing-library/react';
import Movies from './Movies';
import '@testing-library/jest-dom';
import {MemoryRouter} from 'react-router-dom'

const movie1 = {
  average_rating: 6.3,
  backdrop_path:
    "https://image.tmdb.org/t/p/original//o0F8xAt8YuEm5mEZviX5pEFC12y.jpg",
  id: 475430,
  poster_path:
    "https://image.tmdb.org/t/p/original//tI8ocADh22GtQFV28vGHaBZVb0U.jpg",
  release_date: "2020-06-12",
  title: "Artemis Fowl",
}

const movie2 = {
  average_rating: 3.3,
  backdrop_path:"https://image.tmdb.org/t/p/original//o0F8xAt8YuEm5mEZviX5pEFC12y.jpg",
  id: 338762,
  poster_path:"https://image.tmdb.org/t/p/original//8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
  release_date: "2020-03-05",
  title: "Bloodshot",
};

describe("Movies without user logged in", () => {
  it('should render a movie card', () => {
    const {getByRole} = render(
      <MemoryRouter>
        <Movies movies={[movie1]}/>
      </MemoryRouter>
    );

    const moviePoster = getByRole('img', {name:`${movie1.title} movie poster`} )
    expect(moviePoster).toBeInTheDocument();
  })

  it('should render all movie cards', () => {
    const {getAllByRole} = render(
      <MemoryRouter>
        <Movies movies={[movie1, movie2]}/>
      </MemoryRouter>
    );

    const moviePosters = getAllByRole('img')
    expect(moviePosters.length).toEqual(2);
    expect(moviePosters[1]).toBeInTheDocument();
  })
});

describe("Movies when user is logged in", () => {
  const user = {
    email: "greg@turing.io",
    id: 58,
    name: "Greg"
  }

  const ratings = [
    {
      id: 1261,
      movie_id: 338762,
      rating: 6,
      user_id: 58
    }
  ]

  it("should display a form for user to submit rating", () => {
    const {getByRole} = render(
      <MemoryRouter>
        <Movies movies={[movie1]} ratings={ratings} userId={user.id}/>
      </MemoryRouter>
    );

    const submitRatingBtn = getByRole('button', {name: "Submit Review"})
    expect(submitRatingBtn).toBeInTheDocument();
  })

  it("should give the option to delete a rating", () => {
    const {getByRole} = render(
      <MemoryRouter>
        <Movies movies={[movie1, movie2]} ratings={ratings} userId={user.id}/>
      </MemoryRouter>
    );

    const deleteRatingBtn = getByRole('button', {name: "delete rating"})
    expect(deleteRatingBtn).toBeInTheDocument();
  })

});
