import { FormEvent, useState } from "react";
import "./App.css";

import logoImg from "./assets/logo.png";

interface ResultProps {
  resultado: string;
  gasolinaRes: number;
  alcoolRes: number;
}

function App() {
  let [alcool, setAlcool] = useState<number>(0);
  let [gasolina, setGasolina] = useState<number>(0);
  let [resposta, setResposta] = useState<ResultProps>();

  const formatarMoeda = (val: number) => {
    return val.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  const calcular = (e: FormEvent) => {
    e.preventDefault();

    if (alcool / gasolina <= 0.7) {
      setResposta({
        alcoolRes: alcool,
        gasolinaRes: gasolina,
        resultado: "Álcool",
      });
      return;
    }
    setResposta({
      alcoolRes: alcool,
      gasolinaRes: gasolina,
      resultado: "Gasolina",
    });
  };

  return (
    <div>
      <main className="container">
        <img src={logoImg} alt="Logo da calculadora de gasolina" />
        <h1 className="title">Qual é a melhor opção?</h1>

        <form className="form" onSubmit={calcular}>
          <label>Álcool (preço por litro):</label>
          <input
            type="number"
            className="input"
            placeholder="4,00"
            min="0"
            step="0.01"
            value={alcool}
            onChange={(e) => setAlcool(Number(e.target.value))}
            required
          />
          <label>Gasolina (preço por litro):</label>
          <input
            type="number"
            className="input"
            placeholder="6,00"
            min="0"
            step="0.01"
            value={gasolina}
            onChange={(e) => setGasolina(Number(e.target.value))}
            required
          />
          <input className="button" type="submit" value="Calcular" />
        </form>

        {resposta && Object.keys(resposta).length > 0 && (
          <section className="result">
            <h2 className="result-title">
              {resposta?.resultado} é a melhor opção.
            </h2>
            <span>Álcool {formatarMoeda(resposta?.alcoolRes)}</span>
            <span>Gasolina {formatarMoeda(resposta?.gasolinaRes)}</span>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
