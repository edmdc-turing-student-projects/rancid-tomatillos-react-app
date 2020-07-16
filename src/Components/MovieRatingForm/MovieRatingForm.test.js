import React from "react";
import MovieRatingForm from './MovieRatingForm'
import { render, fireEvent, debug } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {addRating, deleteRating, movieRatingsRequests} from '../../apiCalls'
jest.mock( '../../apiCalls');

addRating.mockResolvedValue({
  ratings: [
    {
      id: 1384,
      movie_id: 585244,
      rating: 2,
      user_id: 58
    }
  ]
});

movieRatingsRequests.mockResolvedValue({
  ratings: [
    {
      id: 1384,
      movie_id: 585244,
      rating: 2,
      user_id: 58
    }
  ]
})

const componentProps = {
  movieId: 585244,
  userId: 58
};

const userRating = {
    id: 1384,
    movie_id: 585244,
    rating: 2,
    user_id: 58
};

describe('Rating Form Component', () => {
  it('should have a way to submit a rating', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <MovieRatingForm {...componentProps} />
      </MemoryRouter>
    )

    const ratingForm = getByRole('combobox', {name:'Add a Rating:'})

    expect(ratingForm).toBeInTheDocument()
  })

  it('should have a way to delete a rating', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <MovieRatingForm {...componentProps} userRating={userRating}/>
      </MemoryRouter>
    )

    const text2UserRating = getByRole('button', {name:'delete rating'})

    expect(text2UserRating).toBeInTheDocument()
  })

  it.skip('should submit a rating', async () => {
    const {getByRole, findByRole} = render(
      <MemoryRouter>
        <MovieRatingForm {...componentProps}/>
      </MemoryRouter>
    )

    const submitButton = getByRole('button', {name:'Submit Rating'})

    fireEvent.click(submitButton)
    const text2UserRating = await findByRole('button', {name:'delete rating'})

    expect(text2UserRating).toBeInTheDocument()
  })
});

