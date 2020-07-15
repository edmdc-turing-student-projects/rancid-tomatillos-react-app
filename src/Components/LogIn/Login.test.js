import React from "react";
import Login from "./Login";
import { render, fireEvent, } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Router, MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("Login", () => {
  it("should allow a user to login", () => {
    const { getByRole, getByPlaceholderText } = render(
      <MemoryRouter>
        <Login email="test email" password="test password" />
      </MemoryRouter>
    );

    const email = getByPlaceholderText("email");
    const password = getByPlaceholderText("password");
    const logInButton = getByRole("button", { name: "Submit" });

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(logInButton).toBeInTheDocument();
  });

  it("should log a user in after credentials are given", () => {
    const mockUserLogin = jest.fn();
    const { getByRole, getByPlaceholderText } = render(
      <MemoryRouter>
        <Login postUser={mockUserLogin} />
      </MemoryRouter>
    );

    const userTestEmail = "bob@bob.bob";
    const userTestPassword = "iambob";

    const email = getByPlaceholderText("email");
    const password = getByPlaceholderText("password");
    fireEvent.change(email, { target: { value: userTestEmail } });
    fireEvent.change(password, { target: { value: userTestPassword } });

    const button = getByRole("button", { name: "Submit" });
    fireEvent.click(button);

    expect(mockUserLogin).toBeCalledWith({
      email: "bob@bob.bob",
      error: "",
      password: "iambob",
      redirect: false,
    });
  });

  it("should allow a user to input their credentials", () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const userTestEmail = "bob@bob.bob";
    const userTestPassword = "iambob";

    const email = getByPlaceholderText("email");
    const password = getByPlaceholderText("password");
    fireEvent.change(email, { target: { value: userTestEmail } });
    fireEvent.change(password, { target: { value: userTestPassword } });

    expect(email.value).toEqual(userTestEmail);
    expect(password.value).toEqual(userTestPassword);
  });

  it("should show url going back to home on login", () => {
    const history = createMemoryHistory();
    const mockUserLogin = jest.fn();
    const { getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <Login postUser={mockUserLogin} />
      </Router>
    );

    const userTestEmail = "greg@turing.io";
    const userTestPassword = "abc123";

    const email = getByPlaceholderText("email");
    const password = getByPlaceholderText("password");
    const button = getByRole("button", { name: "Submit" });
    fireEvent.change(email, { target: { value: userTestEmail } });
    fireEvent.change(password, { target: { value: userTestPassword } });
    fireEvent.click(button);

    expect(history.location.pathname).toBe("/");
  });

  it.skip("should show alert when a user logs in with incorrect info", () => {
    const history = createMemoryHistory();
    const mockUserLogin = jest.fn();
    const alert = jest.fn();
    const { getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <Login postUser={mockUserLogin} />
      </Router>
    );

    const userTestEmail = "bob@turing.io";
    const userTestPassword = "abc123";

    const email = getByPlaceholderText("email");
    const password = getByPlaceholderText("password");
    const button = getByRole("button", { name: "Submit" });
    fireEvent.change(email, { target: { value: userTestEmail } });
    fireEvent.change(password, { target: { value: userTestPassword } });
    fireEvent.click(button);
    expect(alert).toHaveBeenCalled(1)
  });
});
