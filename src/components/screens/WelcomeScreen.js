import React, { Component } from 'react';
import axios from 'axios';

import { PrimaryButton, PetDetailsCard } from '../common';
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
    console.log("new pet");
  }

  handlePetClicked(id, component) {
    console.log('details for pet', id);
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
    });
  }

  renderPets() {
    const { pets } = this.state;

    return pets.map((pet, index) => {
      console.log(pet);
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
        <div className='container'>
          <h2>Does my pet need an umbrella?</h2>
          <div className='pets-list'>
            { isLoading
              ? <em>Loading..</em>
              : this.renderPets()
            }
          </div>
        </div>

        <PrimaryButton
          title='Track a New Pet'
          additionalStyles={{
            marginTop: '64px'
          }}
          onClick={this.handleTrackNewPetClicked}
        />
      </div>
    );
  }
}

WelcomeScreen.contextTypes = {
    router: React.PropTypes.object
};

export { WelcomeScreen };
