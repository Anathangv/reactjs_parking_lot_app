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
                ? "parkingspace finalizing"
                : "parkingspace occupied"
              : "parkingspace"
          }
        >
          <div className="topcontainer">
            <div className="parkingPosition">
              <span>{this.props.id + 1} </span>
            </div>
            <div className="inputbox">
              <div className="line">
                <label>
                  <span>Placa</span>
                  <input
                    type="text"
                    placeholder="AAAA-9999"
                    onChange={(e) =>
                      this.props.onUpdatePlate(this.props.id, e.target.value)
                    }
                  />
                </label>
              </div>
              <div className="line">
                <label>
                  <span>Entrada</span>
                  <input
                    className="inputreadonly"
                    typt="text"
                    readOnly
                    value={this.props.parkingSpace.entrance.toLocaleString()}
                  />
                </label>
              </div>
              <div className="line">
                <label>
                  <span>Saída</span>
                  <input
                    className="inputreadonly"
                    typt="text"
                    readOnly
                    value={this.props.parkingSpace.exit.toLocaleString()}
                  />
                </label>
              </div>
              <div className="line">
                <label>
                  <span>Tempo</span>
                  <input
                    className="inputreadonly"
                    typt="text"
                    readOnly
                    value={this.props.parkingSpace.timeSpent}
                  />
                </label>
              </div>
              <div className="line">
                <label>
                  <span>Valor</span>
                  <input
                    className="inputreadonly"
                    typt="text"
                    value={`R$ ${Number(this.props.parkingSpace.value).toFixed(
                      2
                    )}`}
                    readOnly
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="bottoncontainer">
            <button onClick={() => this.props.onStartTime(this.props.id)}>
              Iniciar
            </button>
            <button onClick={() => this.props.onFinishTime(this.props.id)}>
              Finalizar
            </button>
            <button onClick={() => this.props.onResetTime(this.props.id)}>
              Reiniciar
            </button>
            <button
              className="deletebutton"
              onClick={() => this.props.onDelete(this.props.id)}
            >
              Deletar
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ParkingSpace;
