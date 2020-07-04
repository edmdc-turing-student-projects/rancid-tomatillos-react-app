import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

//INTEGRATION
//test for presence of login button
//should say logout if this.state.user = {alkdfj}
//should route to login page

//Async
//test for 200 response


describe("App", () => {
  it("renders page title", () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const linkElement = getByText(/Rancid/gi);
    
    expect(linkElement).toBeInTheDocument();
  });

<<<<<<< Updated upstream
  it('should have a login button', () => {
    const { getByRole } = render(
      <BrowserRouter>
      <App />
      </BrowserRouter>
    )

    const loginButton = getByRole('button', {name: 'Log In'});

    expect(loginButton).toBeInTheDocument();
  });

  it('login button should link to login page', () => {
    const {getByRole} = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )

    const loginButton = getByRole('button', {name: 'Log In'});
    fireEvent.click(loginButton);

    expect(getByRole('link', {href: '/login'})).toBeInTheDocument();
  });

  // it('login button should route to login page', async () => {
  //   const { getByRole, getByPlaceholderText } = render(
  //     <BrowserRouter>
  //       <App />
  //     </BrowserRouter>
  //   )

  //   const loginButton = getByRole('button', {name: 'Log In'});
  //   fireEvent.click(loginButton);

  //   // const inputs = await getByRole('input', {name: 'email'})
  //   const loginForm = await getByPlaceholderText('email')
  //   expect(loginForm).toBeInTheDocument();
  // })

=======
  it('', () => {

  });
>>>>>>> Stashed changes
});
