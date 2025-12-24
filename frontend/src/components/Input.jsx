import styles from "./Input.module.css";

function Input({ label, ...props }) {
  return (
    <label className={styles.label}>
      <span className={styles.text}>{label}</span>
      <input className={styles.input} {...props} />
    </label>
  );
}

export default Input;
