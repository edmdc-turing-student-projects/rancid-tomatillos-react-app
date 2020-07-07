import { apiCall } from "./apiCalls";
import React from "react";
import App from "./App";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
jest.mock("./apiCalls");

describe("App", () => {
  test("renders page title", () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const linkElement = getByText(/Rancid/);
    expect(linkElement).toBeInTheDocument();
  });

  it("should render a movie", async () => {
    apiCall.mockResolvedValue([
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
  });
});
