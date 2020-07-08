const requestUrl = "https://rancid-tomatillos.herokuapp.com/api/v2";

export const getReviews = async (id) => {
  const response = await fetch(`${requestUrl}/users/${id}/ratings`)
  return response.json();
}

export const getReviewsResponse = async (id) => {
  const response = await fetch(`${requestUrl}/users/${id}/ratings`)
  return response;
}