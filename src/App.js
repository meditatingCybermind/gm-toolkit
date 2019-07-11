import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from './styled/theme';
import Roller from './screens/roller/roller'
import PlayerManager from './screens/playerManager/playerManager'

function App() {
    return (
        <div>
            <Roller/>
            <PlayerManager/>
        </div>
    );
}

export default App;
