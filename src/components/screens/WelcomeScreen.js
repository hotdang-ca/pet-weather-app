import React, { Component } from 'react';

import { PrimaryButton } from '../common';

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);

    this.handleGetHelpClicked = this.handleGetHelpClicked.bind(this);
  }

  componentWillMount() {
  }

  handleGetHelpClicked(clickEvent) {
    clickEvent.preventDefault();
    // browserHistory.push('/service');
  }

  render() {
    return (
      <div id='WelcomeScreen'>
        <div className='container'>
          <h2>Does my pet need an umbrella?</h2>
        </div>
      </div>
    );
  }
}

export { WelcomeScreen };
