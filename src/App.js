import './App.css';
import { useEffect, useState } from 'react'

const winnigCombinations = [
  // horizontals
  { indexes: [0, 1, 2], orientation: 'horizontal' },
  { indexes: [3, 4, 5], orientation: 'horizontal' },
  { indexes: [6, 7, 8], orientation: 'horizontal' },

  // verticals
  { indexes: [0, 3, 6], orientation: 'vertical' },
  { indexes: [1, 4, 7], orientation: 'vertical' },
  { indexes: [2, 5, 8], orientation: 'vertical' },

  // diagonals
  { indexes: [0, 4, 8], orientation: 'diagonal-1' },
  { indexes: [6, 4, 2], orientation: 'diagonal-2' },
];


function App() {
  const [gameData, setGameData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [player, setPlayer] = useState(1)
  const [win, setWin] = useState(null)


  
  const handleClick = (indexClicked) => {
    console.log(indexClicked);

    if (gameData[indexClicked] !== 0) {
      return
    }
    if(win){
      return
    }

    setGameData((prevState) => {
      const newGameData = [...prevState];
      newGameData[indexClicked] = player
      return newGameData
    })

    setPlayer((prevState) => (prevState === 1 ? 2 : 1))
  }

  useEffect(() => {
    checkWinner();
    checkVelha()
  },[gameData, win])

    
  
  let playerWinner = '';
  const checkWinner = () => {
    for(let combinations of winnigCombinations) {
      const { indexes } = combinations
      if(
        gameData[indexes[0]] === 1 && 
        gameData[indexes[1]] === 1 &&
        gameData[indexes[2]] === 1
        ){ 
          playerWinner = 'player1'
        }
      if (
        gameData[indexes[0]] === 2 &&
        gameData[indexes[1]] === 2 &&
        gameData[indexes[2]] === 2
      ) {
        playerWinner = 'player2'
      }
      if(playerWinner) {
        setWin(combinations);
        break
      }
    }
    console.log(win);
  }
  
  const checkVelha = () => {
    const velha = gameData.every((element) => element !== 0 );
    const result = win === null && velha
    if(result){
      alert('Deu velha')
    }
  }

  return (
    <div className="title">
      <h1>Jogo da velha</h1>
      <div className="game">
        {gameData.map((element, index) => (
        <span
        key={index}
        onClick={() => handleClick(index)}
        className={win?.indexes.includes(index) ? win.orientation : ''}
        >
          {element === 1 && '❌'}
          {element === 2 && '⭕️'}
        </span>
      ))}
      </div>
    </div>
  );
}

export default App;
