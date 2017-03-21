import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Helmet from 'react-helmet';

import { Footer } from '../common';

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
    scroll(0,0);
    this.refreshPetDetails((pet) => { this.refreshForecast(pet) });
  }

  refreshForecast(pet) {
    console.log('only occurs when we\'ve refreshed our pet.');
    // const { pet } = this.state;
    const { latitude, longitude } = pet;
    console.log('pet: ', pet);

    axios.get(`/weather/${APIKEY}/${latitude},${longitude}`)
    .then((response) => {
      this.setState({
        forecast: response.data
      });
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

    const { pet } = this.state;
    const { currently } = this.state.forecast;
    const { precipProbability, precipType } = currently;

    if (precipProbability > 0 && precipType === 'rain') { // if there's a chance of rain, you need an umbrella
      return
      (<div>
        <h2>YES!</h2><p></p>It looks like { pet.name } is going to need one in { pet.location }.
      </div>);
    } else {
      return (
        <div>
          <h2>NOPE!</h2><p>It looks like { pet.name } won't likely need one in { pet.location }.</p>
        </div>
      );
    }
  }

  render() {
    const { name, type, breed } = this.state.pet;

    let iconString = '';
    if (type !== undefined) {
      switch (type.toLowerCase()) {
        case 'dog':
          iconString = '🐶';
          break;
        case 'cat':
          iconString = '🐱';
          break;
        case 'bird':
          iconString = '🐤';
          break;
        case 'rodent':
          iconString = '🐹';
          break;
        default:
          iconString = '';
      }
    }

    return (
      <div id='PetDetailsScreen'>
        <Helmet
          title={`Does ${name} the ${breed} need an umbrella?`}
        />

        <div className='container'>
          <div className='bi-fold'>
            <div className='left'>
              <span className='emojiIcon' style={{ fontSize: '216px' }}>{iconString}</span>
            </div>
            <div className='right'>
              { this.renderNeedsUmbrella() }
              <Link to='/'>Lookup a different pet</Link>
            </div>
          </div>

          <div className='attribution'>
            <small>
              Based on <code>precipProbability > 0 &amp;&amp; precipType === 'rain'</code><br/>
              <a href="https://darksky.net/poweredby/">Powered By DarkSky</a> (Formally Forecast.io)
            </small>
          </div>

        </div>

        <Footer />
      </div>
    );
  }
}

export { PetDetailsScreen };
