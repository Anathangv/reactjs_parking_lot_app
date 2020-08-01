import React from "react";
import "./App.css";
import ParkingSpace from "./parkingSpace";

class App extends React.Component {
  state = {
    totalparkingSpace: 0,
    parkingSpaceAvalilable: 0,
    parkingSpaceAccupied: 0,

    parkingSpace: { entrance: "", exit: "", value: "", timeSpent: "" },
    parkingSpaceList: [],

    hourCost: 7,
    overTime: 15,
    overtimeCost: 0.5,
  };

  createParkingSpace = () => {
    const newParkingSpace = { ...this.state.parkingSpace };
    const newParkingSpaceList = [
      ...this.state.parkingSpaceList,
      newParkingSpace,
    ];
    this.setState({
      parkingSpaceList: newParkingSpaceList,
    });

    this.updateCounters(1, 1, null);
  };

  deleteAllParkingSpace = () => {
    this.setState({
      parkingSpaceList: [],
      totalparkingSpace: 0,
      parkingSpaceAvalilable: 0,
      parkingSpaceAccupied: 0,
    });
  };

  startTime = (position) => {
    const newParkingSpaceList = [...this.state.parkingSpaceList];
    if (!newParkingSpaceList[position].exit) {
      if (!newParkingSpaceList[position].entrance) {
        this.updateCounters(null, -1, 1);
      }
      newParkingSpaceList[position].entrance = new Date();
      this.setState({
        parkingSpaceList: newParkingSpaceList,
      });
    }
  };

  finishTime = (position) => {
    const newParkingSpaceList = [...this.state.parkingSpaceList];

    if (newParkingSpaceList[position].entrance) {
      const dateStart = new Date(newParkingSpaceList[position].entrance);
      const dateFinish = new Date();

      const milliseconds = Math.abs(dateFinish - dateStart);
      const hours = Math.floor(milliseconds / 3600000);
      const minutes = Math.floor(milliseconds / 60000);
      const seconds = ((milliseconds % 60000) / 1000).toFixed(0);

      newParkingSpaceList[position].exit = dateFinish;
      newParkingSpaceList[position].value =
        this.state.hourCost * (hours > 0 ? hours : 1) +
        this.state.overtimeCost * minutes;
      newParkingSpaceList[position].timeSpent =
        hours + "h:" + minutes + "m:" + seconds + "s";

      this.setState({ parkingSpaceList: newParkingSpaceList });
    }
  };

  deleteParkingSpace = (position) => {
    const newParkingSpaceList = this.state.parkingSpaceList.filter(
      (item, index) => index !== position
    );
    this.setState({ parkingSpaceList: newParkingSpaceList });
  };

  resetTime = (position) => {
    const newParkingSpaceList = [...this.state.parkingSpaceList];
    if (newParkingSpaceList[position].entrance) {
      const parkingSpace = { ...this.state.parkingSpace };
      newParkingSpaceList[position] = parkingSpace;
      this.setState({
        parkingSpaceList: newParkingSpaceList,
      });

      this.updateCounters(null, 1, -1);
    }
  };

  updateCounters = (total, available, occupied) => {
    if (total) {
      this.setState({
        totalparkingSpace: this.state.totalparkingSpace + total,
      });
    }
    if (available) {
      this.setState({
        parkingSpaceAvalilable: this.state.parkingSpaceAvalilable + available,
      });
    }
    if (occupied) {
      this.setState({
        parkingSpaceAccupied: this.state.parkingSpaceAccupied + occupied,
      });
    }
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
            <div className="pricecontrol">
              <label htmlFor="costhour:">Vl Hora:</label>
              <input
                id="costhour"
                type="text"
                placeholder="0.00"
                defaultValue={this.state.hourCost}
              />
              <label htmlFor="overtime:">Tempo Excedente:</label>
              <input
                id="overtime"
                type="text"
                placeholder="0"
                defaultValue={this.state.overTime}
              />
              <label htmlFor="costovertime:">Custo Excedente:</label>
              <input
                id="costovertime"
                type="text"
                placeholder="0.00"
                defaultValue={this.state.overtimeCost}
              />
            </div>
            <div className="buttonscontrol">
              <button onClick={() => this.createParkingSpace()}>Criar</button>
              <button onClick={() => this.deleteAllParkingSpace()}>
                Deletar todas
              </button>
            </div>
          </div>
        </div>

        <div className="container">
          {this.state.parkingSpaceList.map((item, index) => (
            <ParkingSpace
              key={index}
              id={index}
              onStartTime={this.startTime}
              onFinishTime={this.finishTime}
              onResetTime={this.resetTime}
              onDelete={this.deleteParkingSpace}
              parkingSpace={item}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
