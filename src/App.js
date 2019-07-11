import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from './styled/theme';
import Roller from './comps/roller/roller';
import { players, checks } from './data/static.js';
import PlayerManager from './comps/playerManager/playerManager';

function App() {
    const [campaignSelected, setCampaignSelected] = useState(false);
    const [currentCampaign, setCurrentCampaign] = useState({});

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
            setCurrentCampaign(JSON.parse(evt.target.result));
            setCampaignSelected(true);
        };
        let raw = reader.readAsText(file);

        
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
                    <Roller {...currentCampaign}/>
                    <PlayerManager {...currentCampaign}/>
                </>
            )}
        </div>
    );
}

export default App;
