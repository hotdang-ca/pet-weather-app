import React, { Component } from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';
import Geosuggest from 'react-geosuggest';

import { PrimaryButton, Footer } from '../common';

const { showSnackbar } = require('../../utils/Utils');

const APIBASE = '//pet-shelter-api-jperih.herokuapp.com';

class NewPetScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pet: {
        name: undefined,
        type: 1, // initial values
        breed: 1, // initial values
        latitude: undefined,
        longitude: undefined
      },
      breeds: [],
      types: [],
      selectedType: 1,
      errorText: undefined,
      nameError: false,
      locationError: false
    };

    this.refreshBreeds = this.refreshBreeds.bind(this);
    this.renderBreeds = this.renderBreeds.bind(this);

    this.refreshTypes = this.refreshTypes.bind(this);
    this.renderTypes = this.renderTypes.bind(this);

    this.handleSuggestSelect = this.handleSuggestSelect.bind(this);
  }

  componentDidMount() {
    scroll(0,0);

    this.refreshTypes();
    this.refreshBreeds();
  }

  handleSuggestSelect(suggest) {
    this.refs.geoSuggest.hideSuggests();

    this.refs.latitude.value = suggest.location.lat;
    this.refs.longitude.value = suggest.location.lng;

    this.setState({
      pet: {
        ...this.state.pet,
        latitude: suggest.location.lat,
        longitude: suggest.location.lng,
        location: suggest.label
      }
    });

    // and then blur the geosuggest
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
        const newType = e.target.value;

        const filteredBreeds = this.state.breeds.filter((breed) => {
          return breed.type_id === parseInt(newType, 10);
        });

        this.setState({
          pet: {
            ...this.state.pet,
            type: e.target.value,
            breed: (filteredBreeds[0] ? filteredBreeds[0].id : 0)
          },
          selectedType: e.target.value
        });

        // and, see if we can select the first breed
        this.refs.breed.selectedIndex = 0;

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

  submitForm(event) {
    event.preventDefault();

    const { pet } = this.state;
    // TODO: replace with a fancy map function
    console.log(pet);
    if (
          pet.name !== undefined
      &&  pet.type !== undefined
      &&  pet.breed !== undefined
      &&  pet.location !== undefined
      &&  pet.latitude !== undefined
      &&  pet.longitude !== undefined) {
        axios.post(`${APIBASE}/pets`, {
          name: pet.name,
          type_id: pet.type,
          breed_id: pet.breed,
          location: pet.location,
          latitude: pet.latitude,
          longitude: pet.longitude
        })
        .then((response) => {
          if (response.data) {
            if (response.data.name === pet.name) {
              // we got our info back!
              showSnackbar(`Great! Now you can track ${response.data.name}!`);
              // TODO: where should we go..? let's go to the index for now
              this.context.router.history.push(`/`);
            }
          }
        })
        .catch((error) => {
          console.log('error submitting form', error);
          if (error.response.data.code === 409) {
            console.log('Server said ', error.response.data.error);
            showSnackbar('That name already exists amongst that type. Change either field, and try again.');
          } else {
            showSnackbar('There\'s a temporary error sending the form. Probably Heroku is having a hiccup again. Try again in a bit.');
          }
        });
    } else {
      // some errors are field
      const errorText = 'There are errors to correct (highlighted in red)';
      showSnackbar(errorText);

      this.setState({
        errorText,
        nameError: pet.name === undefined,
        locationError: pet.location === undefined
      });
    }
  }

  render() {
    const { nameError, locationError } = this.state;

    const generatedNameInputClassName = nameError ? 'error' : '';
    const generatedLocationInputClassName = locationError ? 'error' : '';

    return (
      <div id='NewPetScreen'>
        <h2>Add your pet</h2>

        <div className='container'>
          <h3>{ this.state.errorText }</h3>
          <form>
            <div className='input-group'>
              <label htmlFor='name'>
                 Name
              </label>

              <input
                className={`${generatedNameInputClassName}`}
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

              <Geosuggest
                ref='geoSuggest'
                id='locationSuggestion'
                className='geosuggest-wrapper'
                inputClassName={`geosuggest-input ${generatedLocationInputClassName}`}
                placeholder="Location"
                autoActivateFirstSuggest
                queryDelay={250}
                ignoreBlur={false}
                onSuggestSelect={this.handleSuggestSelect.bind(this)}
                style={{
                  input: {
                  },
                  suggests: {
                    backgroundColor: '#fff',
                    marginTop: '-10px'
                  },
                  suggestItem: {
                    paddingTop: '6px',
                    paddingBottom: '6px',
                    paddingLeft: '6px',
                    paddingRight: '6px',
                    color: '#000',
                    listStyle: 'none'
                  }
                }}
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
                disabled
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
                disabled
                placeholder='Longitude'
              />
            </div>
          </form>
          <div style={{ width: '100%', marginLeft: '16px', marginRight: '16px', marginTop: '32px' }}>
            <PrimaryButton
              additionalStyles={{ marginTop: '0px', marginLeft: '0px', marginRight: '0px' }}
              title='Add my pet!'
              onClick={this.submitForm.bind(this)}
            />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
};

NewPetScreen.contextTypes = {
    router: React.PropTypes.object
};

export { NewPetScreen };
