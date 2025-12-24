import styles from "./Button.module.css";

function Button({ children, variant = "primary", ...props }) {
  const className =
    variant === "secondary"
      ? `${styles.button} ${styles.secondary}`
      : styles.button;

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}

export default Button;
