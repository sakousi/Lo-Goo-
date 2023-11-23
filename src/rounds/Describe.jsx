import React from 'react';
import { useState, useEffect } from 'react';

export function Describe() {
    const sotred = JSON.parse(localStorage.getItem('players'));
    const [teams, setTeams] = React.useState(sotred);
    const [activePlayerIndex, setActivePlayerIndex] = React.useState(0);
    const [pause, setPause] = React.useState(false);

    console.log(teams);

    const timeAdder = 0

    const setTimeByDificulty = (dificulty) => {
        switch (dificulty) {
            case 1:
                return 45;
            case 2:
                return 30;
            case 3:
                return 25;
            case 4:
                return 15;
            default:
                return 30;
        }
    }

    teams.forEach(team => {
        if(team.time === undefined) team.time = setTimeByDificulty(team.dificulty);
    });

    useEffect(() => {
        const handleSpacebar = (event) => {
            if (event.code === 'Space') {
                handleTimerToggle();
                console.log('spacebar pressed');
            }
        };

        window.addEventListener('keydown', handleSpacebar);
        return () => {
            window.removeEventListener('keydown', handleSpacebar);
        };
    }, [activePlayerIndex, teams]);

    const handleTimerToggle = () => {
        if (teams[activePlayerIndex]?.isLost === false || activePlayerIndex === null) {
            if (pause === false) {
                setTeams((currentPlayers) => {
                    return currentPlayers.map((player, index) => {
                        if (index === activePlayerIndex) {
                            return { ...player, isActive: false };
                        }
                        return player;
                    });
                });

                const nextPlayerIndex = activePlayerIndex === null ? 0 : (activePlayerIndex + 1) % teams.length;
                setActivePlayerIndex(nextPlayerIndex);

                setPause(true);
            } else {
                setTeams((currentPlayers) => {
                    return currentPlayers.map((player, index) => {
                        if (index === activePlayerIndex) {
                            return { ...player, isActive: true };
                        }
                        return player;
                    });
                });
                setPause(false);
            }
        } else {
            const nextPlayerIndex = activePlayerIndex === null ? 0 : (activePlayerIndex + 1) % teams.length;
            setActivePlayerIndex(nextPlayerIndex);
        }
    };

    useEffect(() => {
        let interval = null;
        if (teams[activePlayerIndex]?.isActive) {
            interval = setInterval(() => {
                setTeams((currentPlayers) => {
                    return currentPlayers.map((player, index) => {
                        if (index === activePlayerIndex) {
                            console.log(player.name);
                            console.log(player.time);
                            if (player.time === 0) {
                                return { ...player, isLost: true, isActive: false };
                            }
                            return { ...player, time: (player.time - 1) };
                        }
                        return player;
                    });
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [activePlayerIndex, teams]);


    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-3xl bold pb-5'>Describe Round</h1>
            <h2>Player {teams[activePlayerIndex].name}</h2>
            <p>Time left: {teams[activePlayerIndex].time}</p>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={handleTimerToggle}>
                {pause ? 'Start' : 'Pause'}
            </button>
        </div>
    );
}
export default Describe;