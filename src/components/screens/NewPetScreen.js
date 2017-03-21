import React, { Component } from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';

import { PrimaryButton, Footer } from '../common';
const APIBASE = '//pet-shelter-api-jperih.herokuapp.com';

class NewPetScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pet: {
        name: undefined,
        type: undefined,
        breed: undefined,
        latitude: undefined,
        longitude: undefined
      },
      breeds: [],
      types: [],
      selectedType: 1
    };

    this.refreshBreeds = this.refreshBreeds.bind(this);
    this.renderBreeds = this.renderBreeds.bind(this);

    this.refreshTypes = this.refreshTypes.bind(this);
    this.renderTypes = this.renderTypes.bind(this);
  }

  componentDidMount() {
    scroll(0,0);
    this.refreshTypes();
    this.refreshBreeds();
  }

  onFieldChanged(e) {
    switch (e.target.name) {
      case 'name':
        this.setState({
          pet: {
            ...this.state.pet,
            name: e.target.value
          }
        });
        break;

      case 'type':
        this.setState({
          pet: {
            ...this.state.pet,
            type: e.target.value
          },
          selectedType: e.target.value
        });

        break;

      case 'breed':
        this.setState({
          pet: {
            ...this.state.pet,
            breed: e.target.value
          }
        });
        break;

      case 'location':
        this.setState({
          pet: {
            ...this.state.pet,
            location: e.target.value
          }
        });
        break;
      case 'latitude':
        this.setState({
          pet: {
            ...this.state.pet,
            latitude: e.target.value
          }
        });
        break;
      case 'longitude':
        this.setState({
          pet: {
            ...this.state.pet,
            longitude: e.target.value
          }
        });
        break;

      default:
        console.log('some other field.');
    }
  }

  refreshBreeds() {
    axios.get(`${APIBASE}/breeds`)
    .then((response) => {
      this.setState({
        breeds: response.data
      });
    })
    .catch((error) => {
      console.log('error getting breeds', error);
    });
  }

  refreshTypes() {
    axios.get(`${APIBASE}/types`)
    .then((response) => {
      this.setState({
        types: response.data
      });
    })
    .catch((error) => {
      console.log('error getting types', error);
    });
  }

  renderBreeds(currentType) {
    const { breeds } = this.state;

    let filteredBreeds = breeds.filter((breed) => {
      return breed.type_id === parseInt(currentType, 10);
    });
    
    return filteredBreeds.map((breed, index) => {
      return (
        <option
          key={index}
          value={breed.id}>
          {breed.name}
        </option>
      );
    });
  }

  renderTypes() {
    const { types } = this.state;

    return types.map((type, index) => {
      return (
        <option
          key={index}
          value={type.id}>
          {type.name}
        </option>
      );
    });
  }

  render() {
    return (
      <div id='NewPetScreen'>
        <h2>Add your pet</h2>

        <div className='container'>

          <form>
            <div className='input-group'>
              <label htmlFor='name'>
                 Name
              </label>

              <input
                ref="name"
                onChange={this.onFieldChanged.bind(this)}
                name='name'
                id='name'
                type='text'
                placeholder='Pet name'
              />
            </div>

            <div className='input-group'>
              <label htmlFor='type'>
                 Type
              </label>

              <select id="type" ref="type" name="type" onChange={this.onFieldChanged.bind(this)}>
                { this.renderTypes() }
              </select>

            </div>

            <div className='input-group'>
              <label htmlFor='breed'>
                 Breed
              </label>
              <select
                id="breed"
                ref="breed"
                name="breed"
                onChange={this.onFieldChanged.bind(this)}
              >
                { this.renderBreeds(this.state.selectedType) }
              </select>

            </div>

            <div className='input-group'>
              <label htmlFor='location'>
                 Location
              </label>

              <input
                ref="location"
                onChange={this.onFieldChanged.bind(this)}
                name='location'
                id='location'
                type='text'
                placeholder='Location'
              />
            </div>

            <div className='input-group'>
              <label htmlFor='latitude'>
                 Latitude
              </label>

              <input
                ref="latitude"
                onChange={this.onFieldChanged.bind(this)}
                name='latitude'
                id='latitude'
                type='number'
                placeholder='Latitude'
              />
            </div>

            <div className='input-group'>
              <label htmlFor='longitude'>
                 Longitude
              </label>

              <input
                ref="longitude"
                onChange={this.onFieldChanged.bind(this)}
                name='longitude'
                id='longitude'
                type='number'
                placeholder='Longitude'
              />
            </div>
          </form>
          <div style={{ width: '100%', marginLeft: '16px', marginRight: '16px', marginTop: '32px' }}>
            <PrimaryButton
              additionalStyles={{ marginTop: '0px', marginLeft: '0px', marginRight: '0px' }}
              title='Add my pet!'
            />
          </div>

        </div>
      </div>
    );
  }
};

export { NewPetScreen };
