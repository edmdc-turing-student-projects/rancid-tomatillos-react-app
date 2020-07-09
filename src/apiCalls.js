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
    throw new Error({ ...response });
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
  const movieRatingUrl =  `https://rancid-tomatillos.herokuapp.com/api/v2/users/${userId}/ratings`;

  const submitUserMovieRating = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(movieInfo),
  }

  const response = await fetch(movieRatingUrl, submitUserMovieRating);

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error({ ...response });
  }
}
