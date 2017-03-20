import React, { Component } from 'react';
import axios from 'axios';

class PetDetailsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pet: {
        typeId: undefined,
        breedId: undefined
      }
    };

    this.refreshPetDetails = this.refreshPetDetails.bind(this);
  }

  componentDidMount() {
    this.refreshPetDetails();
  }

  refreshPetDetails() {
    const { match } = this.props;
    const { petId } = match.params;

    axios.get(`//pet-shelter-api.herokuapp.com/pets/${petId}`)
    .then((response) => {
      console.log(response.data);

      this.setState({
        pet: response.data
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    const { name, typeId, breedId } = this.state.pet;

    return (
      <div id='PetDetailsScreen'>
        <div className='container'>
          Hello Pet Details for { name } which is a { typeId } { breedId }
        </div>
      </div>
    );
  }
}

export { PetDetailsScreen };
