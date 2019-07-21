import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from './styled/theme';
import Roller from './comps/roller/roller';
import { players, checks } from './data/static.js';
import PlayerManager from './comps/playerManager/playerManager';

function App() {
    let currentCampaign = {};
    const [campaignSelected, setCampaignSelected] = useState(false);
    const [players, setPlayers] = useState([])
    const [checks, setChecks] = useState([])

    const uploadFile = event => {
        let file = event.target.files[0];
        console.log(file);

        if (file) {
            readFile(file);
        }
    };

    const readFile = (file) => {
        var reader = new FileReader();
        reader.onload = function(evt) {
            currentCampaign = JSON.parse(evt.target.result);
            setCampaignSelected(true);
            initializeCampaign(currentCampaign);
        };
        reader.readAsText(file);
    }

    const initializeCampaign = (campaign) => {
        setPlayers(campaign.players);
        setChecks(campaign.checks);
    }
    
    const updatePlayers = (newPlayers) => {
        setPlayers(newPlayers);
        setTimeout(() => {
            console.log('updatePlayers', players);
        }, 900);
    }

    const logState = () => {
        console.log(players, checks);
    }

    return (
        <div>
            <form action="myform.cgi">
                <input type="file" name="myFile" onChange={uploadFile} />
                <label>
                    {' '}
                    Select a campaign file to upload
                </label>
            </form>
            {campaignSelected && (
                <>
                    <Roller players={players} checks={checks}/>
                    <PlayerManager players={players} checks={checks} setPlayers={updatePlayers}/>
                </>
            )}
            <button onClick={logState}>test state</button>
        </div>
    );
}

export default App;
