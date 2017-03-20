import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import AppWrapper from './AppWrapper';
import { WelcomeScreen, PetDetailsScreen } from './components/screens';

import './main.css';

const Routes = () => (
  <BrowserRouter>
    <AppWrapper title={'Pet Weather'}>
      <Route exact path="/" component={WelcomeScreen}/>
      <Route exact path="/pets/:petId" component={PetDetailsScreen} />
    </AppWrapper>
  </BrowserRouter>
);

ReactDOM.render(
  React.createElement(Routes),
  document.getElementById('root') // eslint-disable-line no-undef
);
