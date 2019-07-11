import React from 'react';
import ReactDOM from 'react-dom';
import Roller from './roller';
import {players, checks} from '../../data/static'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Roller players={players} checks={checks}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});


