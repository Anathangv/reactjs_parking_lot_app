import React from "react";
import "./App.css";
import ParkingSpace from "./parkingSpace";

class App extends React.Component {
  state = {
    totalparkingSpace: 0,
    parkingSpaceAvalilable: 0,
    parkingSpaceAccupied: 0,

    parkingSpace: {
      plate: "",
      entrance: "",
      exit: "",
      value: "",
      timeSpent: "",
    },
    parkingSpaceList: [],

    hourCost: 7,
    overTime: 15,
    overtimeCost: 0.5,
  };

  //create a new parking space
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

  //delete all parking space on screen
  deleteAllParkingSpace = () => {
    this.setState({
      parkingSpaceList: [],
      totalparkingSpace: 0,
      parkingSpaceAvalilable: 0,
      parkingSpaceAccupied: 0,
    });
  };

  //start timing
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

  //finish and calculate cost
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
        (hours >= 1 ? this.state.overtimeCost * minutes : 0);
      newParkingSpaceList[position].timeSpent =
        hours + "h:" + minutes + "m:" + seconds + "s";

      this.setState({ parkingSpaceList: newParkingSpaceList });
    }
  };

  //delete specific parking space
  deleteParkingSpace = (position) => {
    //update counters according to parking space status
    this.state.parkingSpaceList[position].exit
      ? this.updateCounters(-1, 0, -1)
      : this.state.parkingSpaceList[position].entrance
      ? this.updateCounters(-1, 0, -1)
      : this.updateCounters(-1, -1, 0);

    const newParkingSpaceList = this.state.parkingSpaceList.filter(
      (item, index) => index !== position
    );

    this.setState({ parkingSpaceList: newParkingSpaceList });
  };

  //clean data of parking space
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

  //controls the counters based on the parking space status
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

  //update hour cost
  updateHourCost = (newCost) => {
    this.setState({ hourCost: newCost });
  };

  //update over time
  updateOverTime = (newOverTimet) => {
    console.log(newOverTimet);
    this.setState({ overTime: newOverTimet });
  };

  //update over time cost
  updateOverTimeCost = (newOverTimeCost) => {
    console.log(newOverTimeCost);
    this.setState({ hourCovertimeCostost: newOverTimeCost });
  };

  render() {
    return (
      <div className="App">
        <div className="top">
          <div className="pricecontrol">
            <label>
              Valor Hora:
              <input
                id="costhour"
                type="text"
                placeholder="0.00"
                defaultValue={this.state.hourCost}
                onChange={(e) => this.updateHourCost(e.target.value)}
              />
            </label>
            <label>
              Tempo Excedente:
              <input
                id="overtime"
                type="text"
                placeholder="0"
                defaultValue={this.state.overTime}
                onChange={(e) => this.updateOverTime(e.target.value)}
              />
            </label>
            <label>
              Custo Excedente:
              <input
                id="costovertime"
                type="text"
                placeholder="0.00"
                defaultValue={this.state.overtimeCost}
                onChange={(e) => this.updateOverTimeCost(e.target.value)}
              />
            </label>
          </div>

          <div className="topcontent">
            <h1>Parking Lot App</h1>
            <div className="display">
              <span>
                Total: <strong>{this.state.totalparkingSpace}</strong>{" "}
              </span>
              <span>
                Disponível:<strong> {this.state.parkingSpaceAvalilable}</strong>
              </span>
              <span>
                Ocupadas:<strong> {this.state.parkingSpaceAccupied}</strong>
              </span>
              <div className="buttonscontrol">
                <button onClick={() => this.createParkingSpace()}>Criar</button>
                <button
                  className="deleteall"
                  onClick={() => this.deleteAllParkingSpace()}
                >
                  Deletar Todas
                </button>
              </div>
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
