import styles from './styles.module.css';

interface Props {
  bg_color?: string
}

const Snipping = ({bg_color = "#11507299"}: Props) => {
  return (
    <div className={`${styles.bg_snipping} z-100 fixed h-full w-full left-0 top-0`} style={{backgroundColor:bg_color}}>
      <div className={`${styles.sk_chase}`}>
        <div className={`${styles.sk_chase_dot}`}></div>
        <div className={`${styles.sk_chase_dot}`}></div>
        <div className={`${styles.sk_chase_dot}`}></div>
        <div className={`${styles.sk_chase_dot}`}></div>
        <div className={`${styles.sk_chase_dot}`}></div>
        <div className={`${styles.sk_chase_dot}`}></div>
      </div>
    </div>
  )
}

export default Snipping
