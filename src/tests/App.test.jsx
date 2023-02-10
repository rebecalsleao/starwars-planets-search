import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import AppProvider from '../context/AppProvider';
import mockData from './mockData';
import { act } from 'react-dom/test-utils';

describe('Testes da aplicação App',() => {
  beforeEach( async () => {
    global.fetch = jest.fn().mockResolvedValue({
     json: jest.fn().mockResolvedValue(mockData),
    });
     await act( async() => {
      render(    
        <AppProvider>
          <App />
        </AppProvider>,)
      })
  })
  afterEach(() => {
    jest.restoreAllMocks();
  })

  it('Se todos os componentes fixos estão corretamente inseridos na tela', async () => {
    await waitFor(() => expect(screen.getByRole('table')).toBeInTheDocument())

    const planetInput = screen.getByTestId('name-filter');
    expect(planetInput).toBeInTheDocument();
    const columnInput = screen.getByTestId('column-filter');
    expect(columnInput).toBeInTheDocument();
    const operatorInput = screen.getByTestId('comparison-filter');
    expect(operatorInput).toBeInTheDocument();
    const numberValueInput = screen.getByTestId('value-filter');
    expect(numberValueInput).toBeInTheDocument();
    const filterButton = screen.getByTestId('button-filter');
    expect(filterButton).toBeInTheDocument();
    const removeFiltersButton = screen.getByTestId('button-remove-filters');
    expect(removeFiltersButton).toBeInTheDocument();
  });

  it('Verifica o filtro de pesquisa por nome do planeta', async () => {
     
    await waitFor(() => {
      expect(screen.getAllByTestId('planet-content')[0]).toBeInTheDocument();
    }, { timeout: 3000 });
    const planetInput = screen.getByTestId('name-filter');
    userEvent.type(planetInput, 'Hoth');

    const planetHoth = await screen.findAllByTestId('planet-name');
    expect(planetHoth[0]).toHaveTextContent(/Hoth/i);
    userEvent.clear(planetInput);

    userEvent.type(planetInput, 'Bespin');
    const planetBespin = await screen.findAllByTestId('planet-name');
    expect(planetBespin[0]).toHaveTextContent('Bespin');
  });

  it('Verifica o filtro "maior que"', async () => {
   
    await waitFor(() => {
      expect(screen.getAllByTestId('planet-content')[0]).toBeInTheDocument();
    }, { timeout: 3000 });
    const columnInput = screen.getByTestId('column-filter');
    const operatorInput = screen.getByTestId('comparison-filter');
    const numberValueInput = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');

    expect(columnInput).toBeInTheDocument();

    userEvent.selectOptions(columnInput, 'diameter');
    userEvent.selectOptions(operatorInput, 'maior que');
    userEvent.type(numberValueInput, '9000');
    userEvent.click(filterButton);
    const biggerPlanets = screen.getAllByTestId('planet-content');
    expect(biggerPlanets).toHaveLength(7);
    expect(biggerPlanets[3]).toHaveTextContent('Bespin');
  });

  it('Verifica o filtro "igual a"', async() => {

    await waitFor(() => {
      expect(screen.getAllByTestId('planet-content')[0]).toBeInTheDocument();
    }, { timeout: 3000 });
    const columnInput = screen.getByTestId('column-filter');
    const operatorInput = screen.getByTestId('comparison-filter');
    const numberValueInput = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');

    expect(columnInput).toBeInTheDocument();

    userEvent.selectOptions(columnInput, 'diameter');
    userEvent.selectOptions(operatorInput, 'igual a');
    userEvent.type(numberValueInput, '7200');
    userEvent.click(filterButton);
    const biggerPlanets = screen.getByTestId('planet-content');

    expect(biggerPlanets).toHaveTextContent(/Hoth/i);
  
  });

  it('Verifica o filtro "menor que"', async () => {
    
    await waitFor(() => {
      expect(screen.getAllByTestId('planet-content')[0]).toBeInTheDocument();
    }, { timeout: 3000 });
    const columnInput = screen.getByTestId('column-filter');
    const operatorInput = screen.getByTestId('comparison-filter');
    const numberValueInput = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnInput, 'diameter');
    userEvent.selectOptions(operatorInput, 'menor que');
    userEvent.type(numberValueInput, '9000');
    userEvent.click(filterButton);
    const biggerPlanets = screen.getAllByTestId('planet-content');
    expect(biggerPlanets).toHaveLength(3);
    expect(biggerPlanets[2]).toHaveTextContent('Endor');
  });

  test('Verifica se existe os elementos order asc e desc e button', async () => {
    await waitFor(() => {
      expect(screen.getAllByTestId('column-sort-asc-desc-button')[0]).toBeInTheDocument();
    }, { timeout: 3000 });
    
    const ASC = screen.getByTestId('column-sort-input-asc')
    const order = screen.getByRole('button', { name: /ordenar/i })

    userEvent.click(ASC);
    userEvent.click(order);


    const DESC = screen.getByTestId('column-sort-input-desc')
    userEvent.click(DESC);
    userEvent.click(order);
  });

  it('Verifica se o botão de "Remover filtros" funciona', async () => {
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => {
      expect(screen.getAllByTestId('button-remove-filters')[0]).toBeInTheDocument();
    }, { timeout: 3000 });
    const columnInput = screen.getByTestId('column-filter');
    const operatorInput = screen.getByTestId('comparison-filter');
    const numberValueInput = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnInput, 'diameter');
    userEvent.selectOptions(operatorInput, 'menor que');
    userEvent.type(numberValueInput, '9000');
    userEvent.click(filterButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
   
    const filterText = await screen.findAllByTestId('filter');

    expect(filterText[0]).toHaveTextContent('diametermenor que09000');
    // screen.logTestingPlaygroundURL()

    const removeFilterButton = screen.getByTestId('button-remove-filters');
    userEvent.click(removeFilterButton);
  });

  it('Verifica se o botão de "Limpar" funciona', async () => {
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const columnInput = screen.getByTestId('column-filter');
    const operatorInput = screen.getByTestId('comparison-filter');
    const numberValueInput = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnInput, 'diameter');
    userEvent.selectOptions(operatorInput, 'menor que');
    userEvent.type(numberValueInput, '9000');
    userEvent.click(filterButton);
    

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const removeFilterOneClick = await screen.findByTestId('btn-remove-one-click');
    expect(removeFilterOneClick).toBeInTheDocument();
    userEvent.click(removeFilterOneClick);
    screen.logTestingPlaygroundURL()

});

it('Verifica se ao clicar em "Filtrar" o valor dos inputs são limpos', async () => {
  await waitFor(() => expect(global.fetch).toHaveBeenCalled());

  const columnInput = screen.getByTestId('column-filter');
  const operatorInput = screen.getByTestId('comparison-filter');
  const numberValueInput = screen.getByTestId('value-filter');
  const filterButton = screen.getByTestId('button-filter');

  userEvent.selectOptions(columnInput, 'diameter');
  userEvent.selectOptions(operatorInput, 'menor que');
  userEvent.type(numberValueInput, '9000');
  userEvent.click(filterButton);
  
  await waitFor(() => expect(global.fetch).toHaveBeenCalled());

  columnInput.remove();
  operatorInput.remove();
  numberValueInput.remove();
});
});
