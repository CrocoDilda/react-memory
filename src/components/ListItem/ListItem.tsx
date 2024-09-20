import styles from "./list-item.module.css"

type ListItemProps = {
  icon: string
  open: boolean
  onClick: () => void
}

function ListItem({ icon, open, onClick }: ListItemProps) {
  return (
    <li className={styles.list__item}>
      <button className={styles.list__button} onClick={onClick}>
        <div
          className={`${styles.list__curtain} ${
            open ? styles.list__curtain_open : styles.list__curtain_close
          }`}
        ></div>
        <p className={styles.list__text}>{icon}</p>
      </button>
    </li>
  )
}

export default ListItem
