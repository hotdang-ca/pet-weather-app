import React, { Component } from 'react';

class PetDetailsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { match } = this.props;
    const { petId } = match.params;
    console.log(match);
    
    return (
      <div id='PetDetailsScreen'>
        <div className='container'>
          Hello Pet Details for { petId || 'no pet in particular'}
        </div>
      </div>
    );
  }
}

export { PetDetailsScreen };
