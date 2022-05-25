import App from "../App";
import { screen,  } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "./helpers/renderWithRouterAndRedux";

describe('Teste da página de login', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  })
  const INPUT_NAME = 
  const INPUT_EMAIL = 

  test('Testa se a renderização é feita corretamente', () => {
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const bttns = screen.getAllByRole('button');

    expect(inputEmail).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(bttns.length).toBe(2);
    expect(bttns[0]).toHaveAttribute('data-testid', 'btn-play');
    expect(bttns[1]).toHaveAttribute('data-testid', 'btn-settings');
  })

  test('Testa se a função handleChange coloca o valor digitado no value do campo', () => {
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');

    userEvent('type')
  })
})