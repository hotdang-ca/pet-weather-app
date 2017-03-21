import React, { Component } from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';

import { Footer } from '../common';
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
      }
    };
  }

  componentDidMount() {
    scroll(0,0);
  }

  render() {
    return (
      <div id='NewPetScreen'>
        <h2>Add your pet</h2>

        <div className='container'>

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

          <div style={{ width: '100%', marginLeft: '16px', marginRight: '16px', marginTop: '32px' }}>
            <PrimaryButton
              additionalStyles={{ marginTop: '0px', marginLeft: '0px', marginRight: '0px' }}
              title='Add my pet!'
              disabled={this.state.isLoading}
              onClick={this.handleContinueClicked.bind(this)}
            />
          </div>
            
        </div>
      </div>
    );
  }
};

export { NewPetScreen };
