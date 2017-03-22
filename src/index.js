import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import AppWrapper from './AppWrapper';
import { WelcomeScreen, PetDetailsScreen, NewPetScreen } from './components/screens';

import './main.css';

const Routes = () => (
  <BrowserRouter>
    <AppWrapper title={'Pet Weather'}>
      <Switch>
        <Route exact path="/" component={WelcomeScreen}/>
        <Route exact path="/pets/new" component={NewPetScreen} />
        <Route exact path="/pets/:petId" component={PetDetailsScreen} />        
      </Switch>
    </AppWrapper>
  </BrowserRouter>
);

ReactDOM.render(
  React.createElement(Routes),
  document.getElementById('root') // eslint-disable-line no-undef
);
