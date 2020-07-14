export const getAllMovies = async () => {
  const movieUrl = "https://rancid-tomatillos.herokuapp.com/api/v2/movies"

  const response = await fetch(movieUrl);

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error({ ...response });
  }
}

export const loginUser = async (userCredentials) => {
  const loginRequestUrl = "https://rancid-tomatillos.herokuapp.com/api/v2/login"

  const loginRequest = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(userCredentials),
  };

  const response = await fetch(loginRequestUrl, loginRequest);

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error({...response});
  }
}

export const getSingleMovieInfo = async (id) => {
  const singleMovieUrl = `https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`

  const response = await fetch(singleMovieUrl);

  if (response.ok) {
    return await response.json()
  } else {
    throw new Error({...response});
  }
};

export const movieRatingsRequests = async (userId) => {
  const movieRatingUrl = `https://rancid-tomatillos.herokuapp.com/api/v2/users/${userId}/ratings`

  const response = await fetch(movieRatingUrl)

  if (response.ok) {
    return await response.json()
  } else {
    throw new Error({...response})
  }
};

export const addRating = async (userId, movieInfo) => {
  const movieRatingsUrl =  `https://rancid-tomatillos.herokuapp.com/api/v2/users/${userId}/ratings`;

  const submitUserMovieRating = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(movieInfo),
  }

  const response = await fetch(movieRatingsUrl, submitUserMovieRating);

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error({ ...response });
  }
}

export const deleteRating = async (userId, ratingId) => {
  const singleRatingUrl = `https://rancid-tomatillos.herokuapp.com/api/v2/users/${userId}/ratings/${ratingId}`

  const requestOptions = {
    method: "DELETE",
    headers: { "Content-type": "application/json" }
  }

  const response = await fetch(singleRatingUrl, requestOptions)

  return await response.json()
};

export const getComments = async () => {
  const commentsURL = `http://localhost:3001/api/v1/movies/comments`
  const response = await fetch(commentsURL);

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error({ ...response });
  }
};

export const getAllFavorites = async() => {
  const favoritesURL = `http://localhost:3001/api/v1/movies/favorites`
  const response = await fetch(favoritesURL);

  if (response.ok) {
    return await response.json()
  } else {
    throw new Error({...response});
  }
};
