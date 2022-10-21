import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
describe('Testa o app', () => {
  it('Verifica se é renderizado', () => {
    render(<App />);
    const input = screen.getAllByRole('textbox');
    const select = screen.getAllByRole('combobox');
    const button = screen.getByRole('button', {
      name: /filtrar/i,
    });
    expect(input.length).toBe(1);
    expect(select.length).toBe(2);
    expect(button).toBeInTheDocument();
  });
  it('Verifica o filtro', async () => {
    render(<App />);

    const tatooine = await screen.findByText(/Tatooine/i, {}, { timeout: 15000 });
    const planet = screen.getByPlaceholderText('Digite o Planeta');
    const valueFilter = screen.getByTestId('value-filter');
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const buttonFilter = screen.getByRole('button', {
      name: /filtrar/i,
    });

    expect(planet).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(tatooine).toBeInTheDocument();


    userEvent.type(planet, 'Dagobah');
    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(valueFilter, '0');
    userEvent.click(buttonFilter);
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.click(buttonFilter);
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.click(buttonFilter);

  });
  it('Verifica limpa filtros', () => {
    render(<App />);

    const buttonRemoveAll = screen.getByTestId("button-remove-filters");
    const buttonAllRemove = screen.getByRole('button', {
      name: /Limpar filtros/i,
    });

    expect(buttonRemoveAll).toHaveAttribute('type', 'button');
    userEvent.click(buttonAllRemove);

    const inputPlanet = screen.getByPlaceholderText('Digite o Planeta');
    const buttonFiltro = screen.getByRole('button', {
      name: /filtrar/i,
    });

    expect(inputPlanet).toBeInTheDocument();
    userEvent.type(inputPlanet, 'Tatooine');
    userEvent.click(buttonFiltro);
  });
});