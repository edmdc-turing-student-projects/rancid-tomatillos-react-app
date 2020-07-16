import React from "react";
import App from "./App";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { getAllMovies } from "./apiCalls";
jest.mock("./apiCalls");

getAllMovies.mockResolvedValue({
  movies: [
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
  ]
});

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

  it("should render a movie from a fetch call", async () => {
    const { findByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const movieTitle = await findByRole('listitem', {title: "Artemis Fowl"})
    expect(movieTitle).toBeInTheDocument();
  });

  it('should have a login button', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    const loginButton = getByRole('button', {name: 'Log In!'});

    expect(loginButton).toBeInTheDocument();
  });

  it('login button should link to login page', () => {

    const {getByRole, getByPlaceholderText} = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    const loginButton = getByRole('button', {name: 'Log In!'});

    fireEvent.click(loginButton);

    expect(getByPlaceholderText('email')).toBeInTheDocument();
    expect(getByPlaceholderText('password')).toBeInTheDocument();
  });
});

describe("App when user is logged in", () => {
  const user = {
    email: "greg@turing.io",
    id: 58,
    name: "Greg"
  }

  it('should display a welcome banner', () => {
    const {getByRole} = render(
      <MemoryRouter>
        <App user={ user } />
      </MemoryRouter>
    )

    const welcomeBanner = getByRole('heading', {name: 'Welcome Banner'})

    expect(welcomeBanner).toBeInTheDocument();
  });

  it('should display a logout button', () => {
    const {getByRole} = render(
      <MemoryRouter>
        <App user={ user } />
      </MemoryRouter>
    )

    const logOutButton = getByRole('button', {name: "Log Out"});

    expect(logOutButton).toBeInTheDocument();
  })
})
