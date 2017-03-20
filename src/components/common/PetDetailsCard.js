import React from 'react';
import { PrimaryButton } from './';

const PetDetailsCard = ({ pet, onButtonClicked }) => (
  <div id='PetDetailsCard'>
    <b>Name:</b> {pet.name}<br/>
    <b>Location: </b> {pet.location}<br/>
    <b>Type: </b> {pet.Type.name}<br/>
    <b>Breed: </b> {pet.Breed.name}<br/>

    <PrimaryButton
      title={`Does ${pet.name} need an umbrella?`}
      additionalStyles={{ marginTop: '24px', fontSize: '14px', padding: '2px', height: '36px'}}
      onClick={onButtonClicked}
    />
  </div>
);

export { PetDetailsCard };
