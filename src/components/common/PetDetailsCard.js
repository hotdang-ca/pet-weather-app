import React from 'react';
import { PrimaryButton } from './';

const PetDetailsCard = ({ pet, onButtonClicked }) => (
  <div id='PetDetailsCard'>
    <div className='cell-row'>
      <div className='cell'>{pet.name}</div>
      <div className='cell'>{pet.location}</div>
      <div className='cell'>{pet.type}</div>
      <div className='cell'>{pet.breed}</div>
      <div className='cell'>
        <PrimaryButton
          title='View'
          additionalStyles={{ width: '24px', fontSize: '14px', padding: '2px', height: '36px'}}
          onClick={onButtonClicked}
        />
      </div>
    </div>
  </div>
);

export { PetDetailsCard };
