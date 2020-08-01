import React, { Component } from "react";
import "./parkingSpace.css";

class ParkingSpace extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          className={
            this.props.parkingSpace.entrance
              ? this.props.parkingSpace.exit
                ? "containerSpace finalizing"
                : "containerSpace occupied"
              : "containerSpace"
          }
        >
          <div className="parkingPosition">
            <span>{this.props.id}</span>
          </div>
          <div className={"parkingSpace"}>
            <div className="line">
              <label htmlFor="plate">Placa</label>
              <input type="text" id="plate" placeholder="Placa" />
            </div>
            <div className="line">
              <label htmlFor="entrance">Entrada</label>
              <input
                typt="text"
                id="entrance"
                placeholder="Entrada"
                readOnly
                defaultValue={this.props.parkingSpace.entrance.toLocaleString()}
              />
            </div>
            <div className="line">
              <label htmlFor="exit">Saída</label>
              <input
                typt="text"
                id="exit"
                placeholder="Exit"
                readOnly
                defaultValue={this.props.parkingSpace.exit.toLocaleString()}
              />
            </div>
            <div className="line">
              <label htmlFor="cost">Valor</label>
              <input
                typt="text"
                id="cost"
                placeholder="0.00"
                defaultValue={this.props.parkingSpace.value}
                readOnly
              />
            </div>
            <div className="line">
              <button onClick={() => this.props.onStartTime(this.props.id)}>
                Iniciar
              </button>
              <button onClick={() => this.props.onFinishTime(this.props.id)}>
                Finalizar
              </button>
              <button onClick={() => this.props.onResetTime(this.props.id)}>
                Reiniciar
              </button>
              <button onClick={() => this.props.onDelete(this.props.id)}>
                Deletar
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ParkingSpace;
