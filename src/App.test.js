import React from "react";
import App from "./App";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { getAllMovies } from "./apiCalls";
jest.mock("./apiCalls");

getAllMovies.mockResolvedValue([
  {
    average_rating: 6.333333333333333,
    backdrop_path:
      "https://image.tmdb.org/t/p/original//o0F8xAt8YuEm5mEZviX5pEFC12y.jpg",
    id: 475430,
    poster_path:
      "https://image.tmdb.org/t/p/original//tI8ocADh22GtQFV28vGHaBZVb0U.jpg",
    release_date: "2020-06-12",
    title: "Artemis Fowl",
  },
]);

//INTEGRATION
//test for presence of login button
//should say logout if this.state.user = {alkdfj}
//should route to login page

//Async
//test for 200 response


describe("App", () => {
  it("renders page title", () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const linkElement = getByText(/Rancid/);
    expect(linkElement).toBeInTheDocument();
  });

  it("should render a movie", async () => {
    const {getByText, findByText} = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const movieTitle = await findByText('Released')
    // const movieTitle = await waitFor(() => getByText("Artemis Fowl"))
    expect(movieTitle).toBeInTheDocument();
  });
  
  it('should have a login button', () => {
    const { getByRole } = render(
      <MemoryRouter>
      <App />
      </MemoryRouter>
    )

    const loginButton = getByRole('button', {name: 'Log In'});

    expect(loginButton).toBeInTheDocument();
  });

  it('login button should link to login page', () => {
    const {getByRole} = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    const loginButton = getByRole('button', {name: 'Log In'});
    fireEvent.click(loginButton);

    expect(getByRole('link', {href: '/login'})).toBeInTheDocument();
  });

  // it('login button should route to login page', async () => {
  //   const { getByRole, getByPlaceholderText } = render(
  //     <MemoryRouter>
  //       <App />
  //     </MemoryRouter>
  //   )

  //   const loginButton = getByRole('button', {name: 'Log In'});
  //   fireEvent.click(loginButton);

  //   // const inputs = await getByRole('input', {name: 'email'})
  //   const loginForm = await getByPlaceholderText('email')
  //   expect(loginForm).toBeInTheDocument();
  // })


});
