import App from "../App";
import { screen, waitFor, } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "./helpers/renderWithRouterAndRedux";
import '@testing-library/jest-dom';

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
  test('Testa se a o token é requisitado', async () => {
    const response = {
      response_code: 0,
      response_message: "Token Generated Successfully!",
      token: "1f82675980f4bcc8be3edfdec6f199a0ffbb59a9836507418eaf993df3d0e639",
    }

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(response),
    });

    const { history } = renderWithRouter(<App />);
    const inputName = screen.getByTestId(INPUT_NAME);
    const inputEmail = screen.getByTestId(INPUT_EMAIL);
    const btn = screen.getByTestId('btn-play');
    const test = 'José Amaral';
    const email = 'email@email.com';

    userEvent.type(inputName, test);
    userEvent.type(inputEmail, email);
    userEvent.click(btn);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  })
  test('Testa se a rota ao selecionar os botões está correta(/game)', async () => {
    const questions = {
      "response_code": 0,
      "results": [
        {
          "category": "Science & Nature",
          "type": "multiple",
          "difficulty": "hard",
          "question": "What is the scientific name of the knee cap?",
          "correct_answer": "Patella",
          "incorrect_answers": [
            "Femur",
            "Foramen Magnum",
            "Scapula"
          ]
        },
        {
          "category": "Entertainment: Video Games",
          "type": "boolean",
          "difficulty": "easy",
          "question": "The names of Tom Nook&#039;s cousins in the Animal Crossing franchise are named &quot;Timmy&quot; and &quot;Jimmy&quot;.",
          "correct_answer": "False",
          "incorrect_answers": [
            "True"
          ]
        },
        {
          "category": "Entertainment: Video Games",
          "type": "multiple",
          "difficulty": "hard",
          "question": "What is the default name of the Vampire character in &quot;Shining Soul 2&quot;.",
          "correct_answer": "Bloodstar",
          "incorrect_answers": [
            "Sachs",
            "Dracuul",
            "Alucard"
          ]
        },
        {
          "category": "Entertainment: Video Games",
          "type": "multiple",
          "difficulty": "medium",
          "question": "Which game won the &quot;Games for Impact&quot; award in The Game Awards 2015?",
          "correct_answer": "Life is Strange",
          "incorrect_answers": [
            "Ori and the Blind Forest",
            "Rocket League",
            "Metal Gear Solid V: The Phantom Pain"
          ]
        },
        {
          "category": "History",
          "type": "multiple",
          "difficulty": "hard",
          "question": "Which country did the Eureka Rebellion, an 1856 battle against colonial rule, take place in?",
          "correct_answer": "Australia",
          "incorrect_answers": [
            "India",
            "Canada",
            "Brazil"
          ]
        }
      ]
    }
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(questions),
    });

    const { history } = renderWithRouter(<App />);
    const inputName = screen.getByTestId(INPUT_NAME);
    const inputEmail = screen.getByTestId(INPUT_EMAIL);
    const btn = screen.getByTestId('btn-play');
    const test = 'José Amaral';
    const email = 'email@email.com';

    userEvent.type(inputName, test);
    userEvent.type(inputEmail, email);
    userEvent.click(btn);
    expect( await screen.findByTestId('question-category')).toBeInTheDocument();
    expect(history.location.pathname).toBe('/game');


  })
  test('Testa se a rota ao selecionar os botões está correta(/settings)', () => {
    const { history } = renderWithRouter(<App />);
    const btn = screen.getByTestId('btn-settings');

    userEvent.click(btn);
    expect(history.location.pathname).toBe('/settings');
  })
})