// src/App.jsx
import { Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Header from "./components/Header";
import FeedRoute from "./routes/FeedRoute";
import SignInRoute from "./routes/SignInRoute";
import SignUpRoute from "./routes/SignUpRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <FeedRoute />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<SignInRoute />} />
          <Route path="/signup" element={<SignUpRoute />} />
          <Route
            path="*"
            element={<div className={styles.center}>Seite nicht gefunden</div>}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
