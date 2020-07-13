import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Movie from './Movie';

describe("Movie", () => { 
  it('should show a portion of the movie\'s info', () => {
    const { getByText, getByAltText } = render(
      <Movie 
        posterPath='https://image.tmdb.org/t/p/original//tI8ocADh22GtQFV28vGHaBZVb0U.jpg' 
        title='Artemis Fowl' 
        averageRating='5'
        releaseDate='2020-06-12'
        />)

    const movieTitle = getByText('Artemis Fowl')
    const moviePosterPath = getByAltText('Artemis Fowl movie poster')
    const movieReleaseDate = getByText('Released on June 11, 2020')
    const movieAvgRating = getByText('5')

    expect(movieTitle).toBeInTheDocument();
    expect(moviePosterPath).toBeInTheDocument();
    expect(movieReleaseDate).toBeInTheDocument();
    expect(movieAvgRating).toBeInTheDocument();
  })
})
