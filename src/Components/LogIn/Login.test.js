import React from "react";
import Login from "./Login";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

describe("Login", () => {
  it("should allow a user to login", () => {
    const { getByText, getByRole, getByPlaceholderText } = render(
      <BrowserRouter>
        <Login email="test email" password="test password" />
      </BrowserRouter>
    );

    const email = getByPlaceholderText("email");
    const password = getByPlaceholderText("password");
    const logInButton = getByRole("button", { name: "Log In!" });

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(logInButton).toBeInTheDocument();
  });

  it("should log a user in after credentials are given", () => {
    const mockUserLogin = jest.fn();
    const { getByRole } = render(
      <BrowserRouter>
        <Login postUser={mockUserLogin} />
      </BrowserRouter>
    );

    const button = getByRole("button", { name: "Log In!" });
    fireEvent.click(button);

    expect(mockUserLogin).toBeCalled();
  });

  it("should allow a user to input their credentials", () => {
    const { getByPlaceholderText } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const userTestEmail = "bob@bob.bob";
    const userTestPassword = "iambob";

    const email = getByPlaceholderText("email");
    const password = getByPlaceholderText("password");
    fireEvent.change(email, { target: { value: userTestEmail } });
    fireEvent.change(password, { target: { value: userTestPassword } });

    expect(email.value).toEqual(userTestEmail);
    expect(password.value).toBe(userTestPassword);
  });
});
