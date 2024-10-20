import { useState, useEffect } from "react"
import Cup from "./components/Cup"
import ListItem from "./components/ListItem/ListItem"
import Button from "./components/Button/Button"
import GameOverScreen from "./components/GameOver/GameOver"
import "./App.css"

function App() {
  const [rounds, setRounds] = useState(0)
  const [bestScore, setBestScore] = useState<number | string>(
    localStorage.getItem("bestScore")
      ? Number(localStorage.getItem("bestScore"))
      : "This is your first game!"
  )
  const [iconsArray, setIconsArray] = useState<
    Array<{ id: number; symbol: string; flipped: boolean }>
  >([])
  const [correctAnswers, setCorrectAnswers] = useState<
    Array<{ id: number; symbol: string }>
  >([])
  const [activeTiles, setActiveTiles] = useState<
    Array<{ id: number; symbol: string; flipped: boolean }>
  >([])
  const [gameOver, setGameOver] = useState(false)
  const [isNewRecord, setIsNewRecord] = useState(false)

  const symbols = ["🐶", "🐱", "🦁", "🐹", "🐰", "🦝", "🫎", "🐼"]

  //   функция перемешивания массива
  function mixingArray(arr: Array<string>): Array<string> {
    const doubleArr = [...arr, ...arr]
    for (let i = doubleArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[doubleArr[i], doubleArr[j]] = [doubleArr[j], doubleArr[i]]
    }
    return doubleArr
  }

  //   функция создания объекта на основе перемешенного массива, с добавлением id, symbol и flipped(флаг состояния открытия закрытия)
  function creatingAnObject(
    arr: Array<string>
  ): Array<{ id: number; symbol: string; flipped: boolean }> {
    return arr.map((symbol, index) => ({
      id: index,
      symbol,
      flipped: false,
    }))
  }

  function handleClick(id: number) {
    if (activeTiles.length < 2) {
      setIconsArray((prevIconsArray) =>
        prevIconsArray.map((item) =>
          item.id === id ? { ...item, flipped: true } : item
        )
      )

      setActiveTiles((prevActiveTiles) => {
        const clickedTile = iconsArray.find((tile) => tile.id === id)
        return clickedTile ? [...prevActiveTiles, clickedTile] : prevActiveTiles
      })
    }
  }

  useEffect(() => {
    if (activeTiles.length === 2) {
      setRounds((prevRounds) => prevRounds + 1)

      if (activeTiles[0].symbol === activeTiles[1].symbol) {
        setCorrectAnswers((prevCorrectAnswers) => [
          ...prevCorrectAnswers,
          { id: activeTiles[0].id, symbol: activeTiles[0].symbol },
          { id: activeTiles[1].id, symbol: activeTiles[1].symbol },
        ])
        setActiveTiles([])
      } else {
        setTimeout(() => {
          setIconsArray((prevIconsArray) =>
            prevIconsArray.map((item) =>
              activeTiles.some((tile) => tile.id === item.id)
                ? { ...item, flipped: false }
                : item
            )
          )
          setActiveTiles([])
        }, 1000)
      }
    }
  }, [activeTiles])

  useEffect(() => {
    if (correctAnswers.length === iconsArray.length && iconsArray.length > 0) {
      setGameOver(true)

      if (
        typeof bestScore === "number" &&
        (rounds < bestScore || bestScore === 0)
      ) {
        localStorage.setItem("bestScore", rounds.toString())
        setBestScore(rounds)
        setIsNewRecord(true)
      } else if (typeof bestScore === "string") {
        localStorage.setItem("bestScore", rounds.toString())
        setBestScore(rounds)
        setIsNewRecord(true)
      } else {
        setIsNewRecord(false)
      }
    }
  }, [correctAnswers, iconsArray, rounds, bestScore])

  function restartGame() {
    setIconsArray(creatingAnObject(mixingArray(symbols)))
    setRounds(0) // Сброс раундов при перезапуске игры
    setActiveTiles([])
    setCorrectAnswers([])
    setGameOver(false)
    setIsNewRecord(false)
  }

  useEffect(() => {
    setBestScore(
      localStorage.getItem("bestScore")
        ? Number(localStorage.getItem("bestScore"))
        : "This is your first game!"
    )
    setIconsArray(creatingAnObject(mixingArray(symbols)))
  }, [])

  return (
    <>
      <h1 className="title">Memory Game</h1>

      <div className="score-board">
        <p className="score-board__text">Rounds: {rounds}</p>{" "}
        <p className="score-board__text">
          <Cup /> Best score:{" "}
          {typeof bestScore === "number" ? bestScore : "N/A"}
        </p>
      </div>
      <ul className="list">
        {iconsArray.map((item) => (
          <ListItem
            key={item.id}
            icon={item.symbol}
            open={
              item.flipped || correctAnswers.some((ans) => ans.id === item.id)
            }
            onClick={() => handleClick(item.id)}
          />
        ))}
      </ul>
      <Button onClick={restartGame}>New Game</Button>
      {gameOver && (
        <GameOverScreen
          score={rounds}
          bestScore={bestScore}
          onRestart={restartGame}
          isNewRecord={isNewRecord}
        />
      )}
    </>
  )
}

export default App
