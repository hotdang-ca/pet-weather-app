import React, { Component } from 'react';
import axios from 'axios';

// TODO: store somewhere secret
const APIKEY = '82dd8ad9b17dd32e59ea45bab4892856';
const APIBASE = '//pet-shelter-api-jperih.herokuapp.com';

class PetDetailsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pet: {
        typeId: undefined,
        breedId: undefined
      },
      forecast: undefined
    };

    this.refreshPetDetails = this.refreshPetDetails.bind(this);
    this.refreshForecast = this.refreshForecast.bind(this);
    this.renderNeedsUmbrella = this.renderNeedsUmbrella.bind(this);
  }

  componentDidMount() {
    this.refreshPetDetails((pet) => { this.refreshForecast(pet) });
  }

  refreshForecast(pet) {
    console.log('only occurs when we\'ve refreshed our pet.');
    // const { pet } = this.state;
    const { latitude, longitude } = pet;
    console.log('pet: ', pet);

    axios.get(`https://api.darksky.net/forecast/${APIKEY}/${longitude},${latitude}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  refreshPetDetails(callBack) {
    const { match } = this.props;
    const { petId } = match.params;

    axios.get(`${APIBASE}/pets/${petId}`)
    .then((response) => {
      this.setState({
        pet: response.data
      });
      callBack(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  renderNeedsUmbrella() {
    if (!this.state.forecast) {
      return <span>Not sure yet</span>;
    }

    const { currently } = this.state.forecast;
    const { precipProbability, precipType } = currently;

    if (precipProbability > 0 && precipType === 'rain') { // if there's a chance of rain, you need an umbrella
      return <span>You need an umbrella</span>
    } else {
      return <span>You probably don't need an umbrella</span>
    }
  }

  render() {
    const { name, type, breed } = this.state.pet;

    return (
      <div id='PetDetailsScreen'>
        <div className='container'>
          Hello Pet Details for { name } which is a { type } { breed }
          { this.renderNeedsUmbrella() }
        </div>
        <div className='attribution'>
          <a href="https://darksky.net/poweredby/">Powered By DarkSky <small>(Formally Forecast.io)</small></a>
        </div>
      </div>
    );
  }
}

export { PetDetailsScreen };
