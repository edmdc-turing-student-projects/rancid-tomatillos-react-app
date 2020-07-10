import React from "react";
import Login from "./Login";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter, Router } from "react-router-dom";
import { createMemoryHistory } from 'history'

describe.only("Login", () => {
  it("should allow a user to login", () => {
    const { getByRole, getByPlaceholderText } = render(
      <BrowserRouter>
        <Login email="test email" password="test password" />
      </BrowserRouter>
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
    const { getByRole } = render(
      <BrowserRouter>
        <Login postUser={mockUserLogin} />
      </BrowserRouter>
    );

    const button = getByRole("button", { name: "Submit" });
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
    expect(password.value).toEqual(userTestPassword);
  });

  it("should send user back to homepage once they login", () => {
    const history = createMemoryHistory()
    const mockUserLogin = jest.fn();
    const {getByRole, getByText, getByPlaceholderText } = render(
      <Router history={history}>
        <Login postUser={mockUserLogin}/>
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
    
    // const welcomeText = getByText(/Welcome, Greg!/i)
  // fireEvent.click(getByText(/about/i))

  // check that the content changed to the new page
  // expect(button).not.toBeInTheDocument()
    expect(history.location.pathname).toBe("/")
      
  // Welcome, Greg!


  })
});
