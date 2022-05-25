import { render, screen } from '@testing-library/react';
import App from './App';
import data from './data.json';

describe('Comics APP', () =>{
  beforeAll(() => jest.spyOn(window, "fetch"));


  it("Deberia mostrar una lista de propiedades provinientes de la API", () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => data,
    })

    render(<App />)
    expect(window.fetch).toHaveBeenCalledTimes(1);
  })

  it("Deberia mostrar un mensaje de error cuando hay un error de red", async () =>{
    window.fetch.mockRejectedValueOnce(new Error("Network error"));

    render(<App />);

    expect(await screen.findByText("Network error")).toBeInTheDocument();
  })

  


});