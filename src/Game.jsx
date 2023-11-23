import React from 'react';
import { useState, useEffect } from 'react';
import RenderRound from './rounds/RenderRound';

export function Game() {
  const [currentRound, setCurrentRound] = useState(0);

  const handleStartGame = () => {
    if (currentRound === 0) {
      setCurrentRound(1);
    }
  }

  const handleNextRound = () => {
    if (currentRound <= 4) {
      setCurrentRound(currentRound + 1);
      return;
    }
    window.location.href = '/end';

  }

  const handlePreviousRound = () => {
    if (currentRound > 0) {
      setCurrentRound(currentRound - 1);
      return;
    }
  }

  useEffect(() => {
    const handleEnter = (event) => {
      if (event.code === 'Enter') {
        console.log('Enter pressed');
        if (currentRound === 0) {
          handleStartGame();
        }
        if (currentRound > 0) {
          handleNextRound();
        }
      }
    };

    window.addEventListener('keydown', handleEnter);
    return () => {
      window.removeEventListener('keydown', handleEnter);
    };
  }, []);

  return (
    <>
      {
        (currentRound !== 0) ? (
          <>
            <GameStarted handlePreviousRound={handlePreviousRound} handleNextRound={handleNextRound} currentRound={currentRound} />
          </>
        ) : (
          <GameStarter handleStartGame={handleStartGame} />
        )
      }
    </>
  );
};

function GameStarter(props) {
  const handleStartGame = () => {
    props.handleStartGame();
  }
  return (
    <main className='bg-dark h-screen w-screen text-white flex flex-col justify-center items-center'>
      <h1 className='text-4xl font-bold'>Press enter or click the button to start the game !</h1>
      <button className='btn bg-green-500' onClick={handleStartGame}>Start !</button>
    </main>
  )
}

function GameStarted(props) {

  return (
    <main className='bg-dark h-screen w-screen text-white pt-5 flex flex-col justify-between items-center'>
      <div className='flex gap-2'>
        <button onClick={props.handlePreviousRound} className='btn bg-red-500'>Previous Round</button>
        <button onClick={props.handleNextRound} className='btn bg-green-500'>Next Round</button>
      </div>
      <RenderRound round={props.currentRound} />
      <div></div>
    </main>
  )
}
export default Game;