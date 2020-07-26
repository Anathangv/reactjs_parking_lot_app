import React from "react";
import "./App.css";
import { render } from "@testing-library/react";

class App extends React.Component {
  state = {
    totalparkingSpace: 0,
    parkingSpaceAvalilable: 0,
    parkingSpaceAccupied: 0,
  };

  render() {
    return (
      <div className="App">
        <div className="top">
          <h1>Parking lot App</h1>
          <div className="display">
            <span>Total de vagas: {this.state.totalparkingSpace} </span>
            <span>Disponível: {this.state.parkingSpaceAvalilable}</span>
            <span>Ocupadas: {this.state.parkingSpaceAccupied}</span>
          </div>
          <div className="controls">
            <button>Criar</button>
            <button>Deletar todas</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
