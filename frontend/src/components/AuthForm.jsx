import { useState } from "react";
import styles from "./AuthForm.module.css";
import Input from "./Input";
import Button from "./Button";

function AuthForm({ mode, onSubmit, error }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // nur bei SignUp
  const [password, setPassword] = useState("");

  const isSignIn = mode === "signin";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignIn) {
      onSubmit({ email, password });
    } else {
      onSubmit({ email, username, password });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{isSignIn ? "Einloggen" : "Registrieren"}</h2>
      {error && <div className={styles.error}>{error}</div>}

      <Input
        label="E-Mail"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {!isSignIn && (
        <Input
          label="Username"
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      )}

      <Input
        label="Passwort"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit">{isSignIn ? "Login" : "Account erstellen"}</Button>
    </form>
  );
}

export default AuthForm;
