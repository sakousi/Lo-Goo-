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
      }
    };

    window.addEventListener('keydown', handleSpacebar);
    return () => {
      window.removeEventListener('keydown', handleSpacebar);
    };
  }, [activePlayerIndex, teams]);

  const handleTimerToggle = () => {
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
  };

  useEffect(() => {
    let interval = null;
    if (teams[activePlayerIndex]?.isActive) {
      interval = setInterval(() => {
        setTeams((currentPlayers) => {
          return currentPlayers.map((player, index) => {
            if (index === activePlayerIndex) {
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
          Team {player.name}: {player.time}s {player.isActive ? '(Actif)' : ''}
        </div>
      ))}
    
    </div>
  );
};
export default Game;