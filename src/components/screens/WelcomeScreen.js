import React, { Component } from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';

import { PrimaryButton, PetDetailsCard, Footer } from '../common';
const { showSnackbar } = require('../../utils/Utils');

const APIBASE = '//pet-shelter-api-jperih.herokuapp.com';

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: [],
      isLoading: false
    };

    this.handleTrackNewPetClicked = this.handleTrackNewPetClicked.bind(this);
    this.handlePetClicked = this.handlePetClicked.bind(this);
    this.refreshPets = this.refreshPets.bind(this);
    this.renderPets = this.renderPets.bind(this);
  }

  componentWillMount() {
    this.refreshPets();
  }

  handleTrackNewPetClicked(event) {
    event.preventDefault();
    this.context.router.history.push(`/pets/new`);
  }

  handlePetClicked(id, component) {
    this.context.router.history.push(`/pets/${id}`);
  }

  refreshPets() {
    this.setState({
      isLoading: true
    });

    axios.get(`${APIBASE}/pets`)
    .then((response) => {
      this.setState({
        isLoading: false,
        pets: response.data
      });
    })
    .catch((error) => {
      console.log('error', error);
      // #4
      showSnackbar('Oh, darn! Heroku has hung again... try refreshing!');
    });
  }

  renderPets() {
    const { pets } = this.state;

    return pets.map((pet, index) => {
      console.log(pet);
      // #5
      return (
        <PetDetailsCard
          key={index}
          pet={pet}
          onButtonClicked={this.handlePetClicked.bind(this, pet.id)}
        />
      );
    });
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div id='WelcomeScreen'>
        <Helmet
          title={`Pet Weather - Do your pets need an umbrella?`}
        />

        <div className='container'>
          <h1>Does my pet need an umbrella?</h1>
          <h2>Select a pet to find out</h2>
          <div className='pets-list'>

            <div className='pets-list-header'>
              <div className='cell-row'>
                <div className='cell'><strong>Name</strong></div>
                <div className='cell'><strong>Location</strong></div>
                <div className='cell'><strong>Type</strong></div>
                <div className='cell'><strong>Breed</strong></div>
                <div className='cell'><strong>Action</strong></div>
              </div>
            </div>

            { isLoading
              ? <em>Loading..</em>
              : this.renderPets()
            }
          </div>
        </div>

        <div className='button-container'>
          <PrimaryButton
            title='Track a New Pet'
            additionalStyles={{
              marginTop: '64px',
              width: '80%'
            }}
            onClick={this.handleTrackNewPetClicked}
          />
        </div>

        <Footer />
      </div>
    );
  }
}

WelcomeScreen.contextTypes = {
    router: React.PropTypes.object
};

export { WelcomeScreen };
