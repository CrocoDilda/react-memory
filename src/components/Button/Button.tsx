import styles from "./button.module.css"

type ButtonProps = {
  children: string
  onClick: () => void
}

function Button({ children, onClick }: ButtonProps) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
