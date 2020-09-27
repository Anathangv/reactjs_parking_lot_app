import React from "react";
import "./App.css";
import ParkingSpace from "./components/parkingSpace";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
class App extends React.Component {
  state = {
    totalparkingSpace: 0,
    parkingSpaceAvalilable: 0,
    parkingSpaceAccupied: 0,

    parkingSpace: {
      plate: null,
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

  notify = (text) => {
    toast.warn(text, { position: toast.POSITION.TOP_RIGHT });
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

    //check is car palte was informed
    if (!newParkingSpaceList[position].plate) {
      this.notify("Necessário informar a placa do veículo");
    } else {
      console.log(newParkingSpaceList[position].plate);
      console.log("2");
      if (!newParkingSpaceList[position].exit) {
        if (!newParkingSpaceList[position].entrance) {
          this.updateCounters(null, -1, 1);
        }

        newParkingSpaceList[position].entrance = new Date();
        newParkingSpaceList[position].entrance.setHours(12); //teste
        newParkingSpaceList[position].entrance.setMinutes(30); //teste
        this.setState({
          parkingSpaceList: newParkingSpaceList,
        });
      }
    }
  };

  //finish and calculate cost
  finishTime = (position) => {
    const newParkingSpaceList = [...this.state.parkingSpaceList];

    //check is car palte was informed
    if (!newParkingSpaceList[position].plate) {
      this.notify("Necessário informar a placa do veículo");
    } else {
      if (newParkingSpaceList[position].entrance) {
        const dateStart = new Date(newParkingSpaceList[position].entrance);
        const dateFinish = new Date();

        const milliseconds = Math.abs(dateFinish - dateStart);
        let hours = Math.floor(milliseconds / 3600000);
        let minutes = Math.floor((milliseconds / 60000) % 60);
        let seconds = (((milliseconds % 60000) / 1000) % 60).toFixed(0);

        //adjust minutes and seconds to not display 60
        if (seconds === 60) {
          minutes = minutes + 1;
          seconds = 0;
        }
        if (minutes === 60) {
          hours = hours + 1;
          minutes = 0;
        }

        //calculate hour cost
        let value = this.state.hourCost * (hours > 0 ? hours : 1);

        //increment overtime cost
        value +=
          hours >= 1
            ? this.state.overtimeCost *
              Math.trunc(minutes / this.state.overTime)
            : 0;

        newParkingSpaceList[position].exit = dateFinish;
        newParkingSpaceList[position].value = value;
        newParkingSpaceList[position].timeSpent =
          hours + "h:" + minutes + "m:" + seconds + "s";

        this.setState({ parkingSpaceList: newParkingSpaceList });
      }
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

  //update car plate
  updateCarPlate = (position, newPlate) => {
    const newParkingSpaceList = [...this.state.parkingSpaceList];
    newParkingSpaceList[position].plate = newPlate;
    this.setState({ parkingSpaceList: newParkingSpaceList });
  };

  //update hour cost
  updateHourCost = (newCost) => {
    this.setState({ hourCost: newCost });
  };

  //update over time
  updateOverTime = (newOverTimet) => {
    this.setState({ overTime: newOverTimet });
  };

  //update over time cost
  updateOverTimeCost = (newOverTimeCost) => {
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
              onUpdatePlate={this.updateCarPlate}
              parkingSpace={item}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
