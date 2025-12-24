import { useState } from "react";
import styles from "./SignUpRoute.module.css";
import AuthForm from "../components/AuthForm";
import { signUp } from "../lib/api";
import { useNavigate, Link } from "react-router-dom";

function SignUpRoute() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (values) => {
    setError(null);
    try {
      await signUp(values);
      navigate("/");
    } catch (e) {
      console.error(e);
      setError("Registrierung fehlgeschlagen.");
    }
  };

  return (
    <div className={styles.container}>
      <AuthForm mode="signup" onSubmit={handleSignUp} error={error} />
      <p className={styles.switch}>
        Schon einen Account? <Link to="/signin">Zum Login</Link>
      </p>
    </div>
  );
}

export default SignUpRoute;
