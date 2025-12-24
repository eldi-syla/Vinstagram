import { useNavigate, Link } from "react-router-dom";
import { devLogin } from "../lib/session";
import styles from "./SignInRoute.module.css";

function SignInRoute() {
  const navigate = useNavigate();

  function handleDevLogin() {
    devLogin();
    navigate("/");
  }

  return (
    <div className={styles.container}>
      <h2>Login (DEV MODE)</h2>

      <button className={styles.devButton} onClick={handleDevLogin}>
        DEV LOGIN (ohne Backend)
      </button>

      <p className={styles.info}>
        Dieses Login ist provisorisch und dient nur zur Frontend-Entwicklung.
      </p>

      <p>
        Noch kein Account? <Link to="/signup">Registrieren</Link>
      </p>
    </div>
  );
}

export default SignInRoute;
