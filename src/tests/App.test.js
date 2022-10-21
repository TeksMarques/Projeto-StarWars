import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('I am your test', async () => {

  render(<App />);

  const input = screen.getAllByRole("textbox");
  const select = screen.getAllByRole("combobox")
  const placeholder = screen.getByPlaceholderText(/Digite o Planeta/i);


  expect(placeholder).toBeInTheDocument();
  expect(input.length).toBe(1);
  expect(select.length).toBe(2);

  const nameFilter = screen.getByTestId("name-filter");
  const columnFilter = screen.getByTestId("column-filter");
  const comparisonFilter = screen.getByTestId("comparison-filter");
  const valueFilter = screen.getByTestId("value-filter");
  const buttonFilter = screen.getByTestId("button-filter");

  expect(nameFilter).toBeInTheDocument();
  expect(columnFilter).toBeInTheDocument();
  expect(comparisonFilter).toBeInTheDocument();
  expect(valueFilter).toBeInTheDocument();
  expect(buttonFilter).toBeInTheDocument();

  const inputPlanet = screen.getByPlaceholderText('Digite o Planeta');
  const buttonFiltro = screen.getByRole('button', {
    name: /filtrar/i,
  });

  expect(inputPlanet).toBeInTheDocument();
  userEvent.type(inputPlanet, 'Tatooine');
  userEvent.click(buttonFiltro);

  const planets = await screen
    .findAllByTestId('planet-name', undefined, { timeout: 2000 });

  expect(planets.length).toBe(1);
});