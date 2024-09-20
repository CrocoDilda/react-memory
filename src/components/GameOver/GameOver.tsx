import React from "react"
import Button from "../Button/Button"
import styles from "./game-over.module.css"

interface GameOverScreenProps {
  score: number
  bestScore: number | string
  onRestart: () => void
  isNewRecord: boolean
}

function GameOverScreen({
  score,
  bestScore,
  onRestart,
  isNewRecord,
}: GameOverScreenProps): React.ReactElement {
  return (
    <div className={styles.wrapper}>
      <div className={styles.screen}>
        <h2 className={styles.title}>Game Over</h2>
        <p>Your score: {score}</p>
        {isNewRecord && <p>Congratulations! New Record!</p>}
        <p>
          Best score:{" "}
          {typeof bestScore === "number"
            ? bestScore
            : "This is your first game!"}
        </p>
        <Button onClick={onRestart}>Play Again</Button>
      </div>
    </div>
  )
}

export default GameOverScreen
