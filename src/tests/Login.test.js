import App from "../App";
import { screen,  } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "./helpers/renderWithRouterAndRedux";

const INPUT_NAME = 'input-player-name';
const INPUT_EMAIL = 'input-gravatar-email';

describe('Teste da página de login', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  })

  test('Testa se a renderização é feita corretamente', () => {
    const inputName = screen.getByTestId(INPUT_NAME);
    const inputEmail = screen.getByTestId(INPUT_EMAIL);
    const bttns = screen.getAllByRole('button');

    expect(inputEmail).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(bttns.length).toBe(2);
    expect(bttns[0]).toHaveAttribute('data-testid', 'btn-play');
    expect(bttns[1]).toHaveAttribute('data-testid', 'btn-settings');
  })

  test('Testa se a função handleChange coloca o valor digitado no value do campo', () => {
    const inputName = screen.getByTestId(INPUT_NAME);
    const inputEmail = screen.getByTestId(INPUT_EMAIL);
    const test = 'text';
    const email = 'email@email.com';

    userEvent.type(inputName, test);
    userEvent.type(inputEmail, email);

    expect(inputName).toHaveAttribute('value', test);
    expect(inputEmail).toHaveAttribute('value', email);
  })

  
})

describe('Testes dos botões', () => {
  test('Testa se a rota ao selecionar os botões está correta', async () => {
    const { history } = renderWithRouter(<App />);
    const inputName = screen.getByTestId(INPUT_NAME);
    const inputEmail = screen.getByTestId(INPUT_EMAIL);
    const test = 'text';
    const email = 'email@email.com';
    const btn = screen.getByTestId('btn-play');

    userEvent.type(inputName, test);
    userEvent.type(inputEmail, email);
    userEvent.click(btn);
    setTimeout(() => {
      expect(history.location.pathname).toBe('/game');
    }, 1000)
  })
  test('Testa se a rota ao selecionar os botões está correta', async () => {
    const { history } = renderWithRouter(<App />);
    const btn = screen.getByTestId('btn-settings');

    userEvent.click(btn);

    expect(history.location.pathname).toBe('/settings');
  })

})