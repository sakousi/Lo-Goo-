import React from 'react';
import {useState, useEffect} from 'react';

export function Game(props) {

  const sotred = JSON.parse(localStorage.getItem('players'));
  const [teams, setTeams] = useState(sotred);
  const [activePlayerIndex, setActivePlayerIndex] = useState(null);
  const [pause, setPause] = useState(false);

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
    if(teams[activePlayerIndex]?.isLost === false || activePlayerIndex === null) {
        if (pause === false) {
            setTeams((currentPlayers) => {
              return currentPlayers.map((player, index) => {
                if (index === activePlayerIndex) {
                  return { ...player, isActive: false, time: player.time + 10 };
                }
                return player;
              });
            });

            const nextPlayerIndex = activePlayerIndex === null ? 0 : (activePlayerIndex + 1) % teams.length;
            setActivePlayerIndex(nextPlayerIndex);

            setPause(true);
        }else{
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
    }else{
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
                if (player.time === 0) {
                    return { ...player, isLost: true, isActive: false };
                }
              return { ...player, time: player.time - 1 };
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
    <div>
      {teams.map((player) => (
        <div key={player.id}>
          Team {player.name}: {player.time}s {player.isActive ? '(Actif)' : ''} {player.isLost ? '(You lost)' : ''}
        </div>
      ))}
    
    </div>
  );
};
export default Game;