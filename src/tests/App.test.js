import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import mockData from './mockData'
import { act } from 'react-dom/test-utils';

const PLANETS = mockData.results;
const COLUMN_FILTER = 'column-filter';
const COMPARISON_FILTER = 'comparison-filter';
const VALUE_FILTER = 'value-filter';
const BUTTON_FILTER = 'button-filter';

describe('Renderiza o compoente funcional App', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }))
  });

  test('Se é realizada a requisicao para a API', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('Se a tabela é preenchida com os valores retornados', async () => {
    await act(async () => {
      render(<App />);
    });

    for(let index in PLANETS) {
      const name = await screen.findByText(PLANETS[index].name);
      const rotationPeriod = await screen.findAllByText(PLANETS[index].rotation_period);
      const orbitalPeriod = await screen.findAllByText(PLANETS[index].orbital_period);
      const diameter = await screen.findAllByText(PLANETS[index].diameter);
      const climate = await screen.findAllByText(PLANETS[index].climate);
      const gravity = await screen.findAllByText(PLANETS[index].gravity);
      const terrain = await screen.findAllByText(PLANETS[index].terrain);
      const surfaceWater = await screen.findAllByText(PLANETS[index].surface_water);
      const population = await screen.findAllByText(PLANETS[index].population);


      expect(name).toBeInTheDocument();
      expect(rotationPeriod.length).toBeGreaterThanOrEqual(1);
      expect(orbitalPeriod.length).toBeGreaterThanOrEqual(1);
      expect(diameter.length).toBeGreaterThanOrEqual(1);
      expect(climate.length).toBeGreaterThanOrEqual(1);
      expect(gravity.length).toBeGreaterThanOrEqual(1);
      expect(terrain.length).toBeGreaterThanOrEqual(1);
      expect(surfaceWater.length).toBeGreaterThanOrEqual(1);
      expect(population.length).toBeGreaterThanOrEqual(1);

    };
  });

  test('verifica se a tabela possui o número correto de linhas (11)', async () => {
    await act(async () => {
      render(<App />);
    });
    const rows = await screen.findAllByRole('row');
    expect(rows).toHaveLength(11);
  });

  test('Se a tabela possui o numero correto de colunas(13)', async () => {
    await act(async () => {
      render(<App />);
    });
    const columns = await screen.findAllByRole('columnheader');
    expect(columns).toHaveLength(13);
  });


  test('verifica se existe um input para filtro de texto', () => {
    render(<App />);
    const textInput = screen.getByRole('textbox');
    expect(textInput).toBeInTheDocument();
  });

  test('verifica se o filtro por nome retorna os valores corretos', async () => {
    await act(async () => {
      render(<App />);
    });
    const textInput = screen.getByRole('textbox');
    const planetTatooine = screen.getByRole('cell', {
      name: /tatooine/i

    });
    const planetNaboo = screen.getByRole('cell', {
      name: /naboo/i
    });
    
    userEvent.type(textInput, 'oo');
    expect(planetTatooine).toBeInTheDocument();
    expect(planetNaboo).toBeInTheDocument();
  });

  test('Se o filtro da coluna é renderizado', async () => {
    await act(async () => {
      render(<App />);
    });
    const selectColumn = await screen.findByTestId(COLUMN_FILTER);
    expect(selectColumn).toHaveProperty('nodeName', 'SELECT');
    const optionColumns = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    const filterColumn = Array.from(selectColumn.children).map(child => {
      expect(child).toHaveProperty('nodeName', 'OPTION');
      return child.innerHTML;
    });
    expect(filterColumn).toEqual(expect.arrayContaining(optionColumns));
  });

  test('Se o filtro de comparação é renderizado', async () => {
    await act(async () => {
      render(<App />);
    });
    const selectComparison = await screen.findByTestId(COMPARISON_FILTER);
    expect(selectComparison).toHaveProperty('nodeName', 'SELECT');
    const optionComparison = ['maior que', 'menor que', 'igual a'];
    const filterComparison = Array.from(selectComparison.children).map(child => {
      expect(child).toHaveProperty('nodeName', 'OPTION');
      return child.innerHTML;
    });
    expect(filterComparison).toEqual(expect.arrayContaining(optionComparison));
  });

  test('Se existe um input para filtro de número', () => {
    render(<App />);
    const number = screen.getByTestId(VALUE_FILTER);
    expect(number).toBeInTheDocument();
  });

  test('Se existe um botão para filtro de número', () => {
    render(<App />);
    const filterButton = screen.getByTestId(BUTTON_FILTER);
    expect(filterButton).toBeInTheDocument();
  });

  test('Se a comparação "maior que" retorna os dados corretos', async () => {
    await act(async () => {
      render(<App />);
    });
    const selectColumn = await screen.findByTestId(COLUMN_FILTER);
    const selectComparison = await screen.findByTestId(COMPARISON_FILTER);
    const numberInput = screen.getByTestId(VALUE_FILTER);
    const filterButton = screen.getByTestId(BUTTON_FILTER);

    fireEvent.change(selectColumn, { target: { value: 'diameter' }});
    fireEvent.change(selectComparison, { target: { value: 'maior que' }});
    fireEvent.change(numberInput, { target: { value: '8900' }});
    fireEvent.click(filterButton);

    const tableRows = await screen.findAllByRole('row');
    expect(tableRows).toHaveLength(8); 
  });
});


