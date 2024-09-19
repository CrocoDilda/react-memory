import { useState, useEffect } from "react"
import Cup from "./components/Cup"
import ListItem from "./components/ListItem/ListItem"
import Button from "./components/Button/Button"
import "./App.css"

function App() {
  const [count, setCount] = useState(0)
  const [bestScore, setBestScore] = useState("This is your first game!")
  const [iconsArray, setIconsArray] = useState<
    Array<{ id: number; symbol: string; flipped: boolean }>
  >([])

  const symbols = ["🐶", "🐱", "🦁", "🐹", "🐰", "🦝", "🫎", "🐼"]

  function mixingArray(arr: Array<string>): Array<string> {
    const doubleArr = [...arr, ...arr]
    for (let i = doubleArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[doubleArr[i], doubleArr[j]] = [doubleArr[j], doubleArr[i]]
    }
    return doubleArr
  }

  function creatingAnObject(
    arr: Array<string>
  ): Array<{ id: number; symbol: string; flipped: boolean }> {
    const array = []
    for (let i = 0; i < arr.length; i++) {
      array.push({
        id: i,
        symbol: arr[i],
        flipped: false,
      })
    }
    return array
  }

  function handleClick(id: number) {
    setIconsArray((prevIconsArray) =>
      prevIconsArray.map((item) =>
        item.id === id ? { ...item, flipped: !item.flipped } : item
      )
    )
    setCount(count + 1)
  }

  useEffect(() => {
    setBestScore(
      `${
        localStorage.getItem("bestScore")
          ? localStorage.getItem("bestScore")
          : bestScore
      }`
    )
    setIconsArray(creatingAnObject(mixingArray(symbols)))
    console.log(iconsArray)
  }, [])

  return (
    <>
      <h1 className="title">Memory Game</h1>
      <div className="score-board">
        <p className="score-board__text">Attempts: {count}</p>
        <p className="score-board__text">
          <Cup /> Best score: {bestScore}
        </p>
      </div>
      <ul className="list">
        {iconsArray.map((item) => (
          <ListItem
            key={item.id}
            icon={item.symbol}
            open={item.flipped}
            onClick={() => handleClick(item.id)}
          />
        ))}
      </ul>
      <Button>New Game</Button>
    </>
  )
}

export default App
