import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

const endpoint = "http://api.openweathermap.org/data/2.5/weather?q=";
const geoendpoint="http://api.openweathermap.org/data/2.5/weather?"
class App extends Component {
	state = {
		data: "",
		city: "",
		input: "",
		lat: 0,
		lon: 0
	};

	componentDidMount() {
		console.log("component mounted");
    navigator.geolocation.getCurrentPosition(data =>
      this.setState({
        lat: Math.floor(data.coords.latitude),
        lon: Math.floor(data.coords.longitude)
      })
    );
	}

	handleChange = ({ target }) =>
		this.setState({
			input: target.value
		});

	handleClick = ({ target }) => {
		console.log(this.state.input);
		const searchString = this.state.input;

		fetch(endpoint + searchString + apiKey)
			.then(res => res.json())
			.then(data => {
				this.setState({ data: data.main.temp });
			});
  };
  
  handleGeoClick = () => {
    fetch(`${geoendpoint}lat=${this.state.lat}&lon=${this.state.lon}${apiKey}`)
      .then(res => res.json())
      .then(data => this.setState({
        data: data.main.temp,
        city: data.name,
      }));
  }

	render() {
		return (
			<div className="App">
				<h1>Weather</h1>
				<input
					type="text"
					onChange={this.handleChange}
					value={this.state.input}
				/>
				<button onClick={this.handleClick}>Search</button>
				<button onClick={this.handleGeoClick}>Your location </button>
				<div>
					{" "}
					{`${Math.floor(
						((this.state.data - 273) * 9) / 5 + 32
					)}F`}{" "}
				</div>
				<div>{this.state.city}</div>
			</div>
		);
	}
}

export default App;
