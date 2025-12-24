import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Button from "./Button";
import { useCurrentUser, removeSession } from "../lib/session";

function Header() {
  const user = useCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeSession();
    navigate("/signin");
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link to="/" className={styles.logo}>
          Mini-Social
        </Link>
      </div>
      <div className={styles.right}>
        {user ? (
          <>
            <span className={styles.user}>Hallo, {user.username}</span>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Link to="/signin">
              <Button variant="secondary">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Registrieren</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
