import React from "react";

function App() {
  const [teamNumber, setTeamsNumber] = React.useState(2);
  const [teamsDificulty, setTeamsDificulty] = React.useState([2,2]);
  const [selectedDificulty, setSelectedDificulty] = React.useState(1);

  //dumping the localstorage
  localStorage.setItem('players', JSON.stringify([]));

  const handleDifficultyChange = (e) => {
    e.preventDefault();
    setSelectedDificulty(e.target.id);
  }

  const handleAddTeam = (e) => {
    e.preventDefault();
    if(teamNumber >= 6){
      alert("You can't have more than 6 players");
      return;
    }
    setTeamsNumber(teamNumber + 1);
    setTeamsDificulty([...teamsDificulty, 2]);
  }

  const handleRemoveTeam = (e) => {
    e.preventDefault();
    if(teamNumber > 2){
      setTeamsNumber(teamNumber - 1);
      let newTeamsDificulty = [...teamsDificulty];
      newTeamsDificulty.pop();
      setTeamsDificulty(newTeamsDificulty);
    }else{
      alert("You need at least 2 players");
    }
    
  }

  const handleTeamDifficulty = (e) => {
    e.preventDefault();
    //set the dificulty of the team like [1,1,3,1] for team 3
    let newTeamsDificulty = [...teamsDificulty];
    newTeamsDificulty[selectedDificulty-1] = parseInt(e.target.id);
    setTeamsDificulty(newTeamsDificulty);
    console.log(teamsDificulty);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let players = [];
    for(let i = 0; i < teamNumber; i++) {
      let time
      switch (teamsDificulty[i]) {
          case 1:
              time = 60;
              break;
          case 2:
              time = 45;
              break;
          case 3:
              time = 30;
              break;
          case 4:
              time = 15;
              break;
          }
      let player = {
        id: i+1,
        name: e.target[`player ${i+1}`].value,
        time: time,
        dificulty: teamsDificulty[i],
        isActive: false,
        isLost: false,
      }
      players.push(player);
    }
    console.log(players);
    localStorage.setItem('players', JSON.stringify(players));
    window.location.href = "/game";
  }

  let playersFields = [];
  for(let i = 0; i < teamNumber; i++) {
    playersFields.push(
      <>
        <label htmlFor={`player ${i+1}`}>Team {i+1}: </label>
        <input className="px-2 py-0 box-border mx-2 text-black" type="text" name={`player ${i+1}`} placeholder="Team name" />
        <button id={i+1} onClick={handleDifficultyChange} className={`btn ${(selectedDificulty == i+1) ? "bg-light text-black border-2" : "bg-dark text-light border-2"}`}>Change dificulty</button>
      </>
    );
  }

  return (
    <main className="bg-dark text-white w-screen h-screen">
      <div className="container h-full grid">
        <div className="flex justify-center">
          <h1 className="text-5xl font-bold">Lo-GOO!!</h1>
        </div>
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center gap-2 pb-5">
              <h2>Game dificulty for team {selectedDificulty}:</h2>
              <div className="flex gap-5">
                <button id={1} onClick={handleTeamDifficulty} className={`btn bg-easy ${(teamsDificulty[selectedDificulty-1] == 1) ? "border-2 border-solid border-light" : ""}`}>Easy</button>
                <button id={2} onClick={handleTeamDifficulty} className={`btn bg-medium ${(teamsDificulty[selectedDificulty-1] == 2) ? "border-2 border-solid border-light" : ""}`}>Medium</button>
                <button id={3} onClick={handleTeamDifficulty} className={`btn bg-hard ${(teamsDificulty[selectedDificulty-1] == 3) ? "border-2 border-solid border-light" : ""}`}>Hard</button>
                <button id={4} onClick={handleTeamDifficulty} className={`btn bg-extrem ${(teamsDificulty[selectedDificulty-1] == 4) ? "border-2 border-solid border-light" : ""}`}>Extrem</button>
              </div>
            </div>
          <div className="flex gap-5 pb-5">
            <button className="btn bg-green-500" onClick={handleAddTeam}>Add Team</button>
            <button className="btn bg-red-500" onClick={handleRemoveTeam}>Remove Team</button>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 flex-col">
            {playersFields.map((field,index) => 
            <div className="flex" key={index}>
              {field}
            </div>
            )}
            <input type="submit" className="btn bg-green-700" value={'Start da game'}/>
          </form>
        </div>
        <div>

        </div>
      </div>
    </main>
  );
}

export default App;
