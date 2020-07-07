export const apiCall = () => {
  const rootUrl = "https://rancid-tomatillos.herokuapp.com/api/v2";

  return {
    getAllMovies: async () => {
      const response = await fetch(`${rootUrl}/movies`);

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error({ ...response });
      }
    },

    loginUser: async (userCredentials) => {
      const loginRequest = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userCredentials),
      };

      const response = await fetch(`${rootUrl}/login`, loginRequest);

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error({ ...response });
      }
    },
  };
};
