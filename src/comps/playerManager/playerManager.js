import React, { useState } from 'react';
import _ from 'lodash';
import styled from '../../styled/theme';

const PlayerManager = props => {
    let { players, checks, setPlayers } = props;

    const [currentPlayer, setCurrentPlayer] = useState('');
    const [playerCreatorVisible, setPlayerCreatorVisibility] = useState(false);
    const [newPlayerName, setNewPlayerName] = useState('');
    const [newCharacterName, setNewCharacterName] = useState('');
    const [editedChecks, setEditedChecks] = useState({});
    const [currentPlayerObj, setCurrentPlayerObj] = useState(false);

    const changePlayer = event => {
        setCurrentPlayer(event.target.value);
    };

    const togglePlayerCreator = () => {
        setPlayerCreatorVisibility(!playerCreatorVisible);
    };

    const playerNameString = player =>
        `${_.capitalize(player.characterName)} (${_.capitalize(
            player.playerName
        )})`;

    const createCharacter = event => {
        event.preventDefault();
        let newPlayer = {
            playerName: newPlayerName.toLowerCase(),
            characterName: newCharacterName.toLowerCase(),
            checks: {}
        };

        checks.forEach(check => {
            newPlayer.checks[check] = 0;
        });

        console.log(newPlayer);
        upsertCharacter(newPlayer);
    };

    const editCharacter = event => {
        event.preventDefault();
        let player = currentPlayerObj;
        player.checks = { ...player.checks, ...editedChecks };
        upsertCharacter(player);
    };

    const upsertCharacter = player => {
        const index = players.findIndex((p) => {
            return p.characterName === player.characterName;
        })
        console.log(index);
        if (index >= 0) {
            let updatedPlayers = [...players];
            updatedPlayers[index] = player;
            setPlayers(updatedPlayers); 
        } else {
            setPlayers([...players, player]);
        }
        setTimeout(() => {
            setCurrentPlayer(player.characterName);
        }, 1000);

        setCurrentPlayerObj(player);
    };

    const editChecks = (value, check) => {
        let newChecks = { ...editedChecks };
        newChecks[check] = value;
        setEditedChecks(newChecks);
    };

    return (
        <div>
            {players.length > 0 && (
                <select onChange={changePlayer} value={currentPlayer}>
                    {players.map(player => {
                        return (
                            <option
                                key={player.characterName}
                                value={player.characterName}
                            >
                                {playerNameString(player)}
                            </option>
                        );
                    })}
                </select>
            )}
            {players.length === 0 && 'No players in this campaign, add some!'}
            <button onClick={togglePlayerCreator}>Add PC</button>
            {playerCreatorVisible && (
                <form onSubmit={createCharacter}>
                    Enter Player Name:
                    <input
                        value={newPlayerName}
                        onChange={event => setNewPlayerName(event.target.value)}
                        label="PName"
                    />
                    Enter Character Name:
                    <input
                        value={newCharacterName}
                        onChange={event =>
                            setNewCharacterName(event.target.value)
                        }
                        label="name"
                    />
                    <input type="submit" value="Submit" />
                </form>
            )}
            {currentPlayer && (
                <form onSubmit={editCharacter}>
                    <table>
                        <thead>
                            <tr>
                                <th>Check</th>
                                <th>Current Value</th>
                                <th>New Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPlayerObj &&
                                checks.map(check => (
                                    <tr key={check}>
                                        <td>{check}</td>
                                        <td>
                                            {currentPlayerObj.checks[check]}
                                        </td>
                                        <td>
                                            <input
                                                value={editedChecks[check]}
                                                onChange={(event, check) =>
                                                    editChecks(
                                                        event.target.value,
                                                        check
                                                    )
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <button onClick={editCharacter}>Save Skills</button>
                </form>
            )}
        </div>
    );
};

export default PlayerManager;
