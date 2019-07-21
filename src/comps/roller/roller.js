import React, { useState } from 'react';
import _ from 'lodash';
import Roll from 'roll';
import styled from '../../styled/theme';

const roller = new Roll();

const Roller = (props) => {
    let {players, checks} = props
    const [results, setResults] = useState({});
    const [haveRolledOnce, setFirstRoll] = useState(false);
    const [DC, setDC] = useState(0);
    const [currentSkill, setCurrentSkill] = useState(
        checks[Object.keys(checks)[0]]
    );

    const rollAll = players => {
        let ret = {};
        if (players.length === 0) return;
        players.map(player => {
            ret[player.characterName] = roller.roll(`d20+${player.checks['perception']}`);
        });
        !haveRolledOnce && setFirstRoll(true)
        return ret;
    };

    const switchCheck = event => {
        setCurrentSkill(event.target.value);
    };

    const updateDC = event => {
        setDC(event.target.value);
    }

    const getOutcome = roll => {
        if (roll.rolled === 20) return outcomeString(roll.result + 10)
        if (roll.rolled === 1) return outcomeString(roll.result - 10)
        return outcomeString(roll.result);
    }

    const outcomeString = result => `${Math.abs(result - DC) > 10 ? 'Critical ':''} ${result >= DC ? 'Success' : 'Failure'}`
    
    return (
        <div>
            <select onChange={switchCheck} value={currentSkill}>
                {checks.map(check => {
                    return (
                        <option key={check} value={check}>
                            {_.capitalize(check)}
                        </option>
                    );
                })}
            </select>
            <span>DC:</span>
            <input onChange={updateDC} value={DC}/>
            <button onClick={() => setResults(rollAll(players))}>roll</button>
            <table>
                <tbody>
                    <tr>
                        <th>Creature Name</th>
                        <th>Temp. Bonus</th>
                        <th>Result</th>
                        <th>Outcome</th>
                    </tr>
                    {players.map(player => {
                        return (
                            <tr key={player.characterName}>
                                <td>{player.characterName}</td>
                                <td>
                                    <input ></input>
                                </td>
                                <td>
                                    {haveRolledOnce && (
                                        <span>
                                            {results[player.characterName].rolled} +{' '}
                                            {player.checks[currentSkill]} ={' '}
                                            {results[player.characterName].result}    
                                        </span>
                                    )}
                                    
                                </td>
                                <td>
                                    {haveRolledOnce && getOutcome(results[player.characterName])}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Roller;
