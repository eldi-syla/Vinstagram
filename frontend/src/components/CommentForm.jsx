import { useState } from "react";
import styles from "./CommentForm.module.css";
import Button from "./Button";

function CommentForm({ onSubmit }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    setText("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Kommentar schreiben..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button type="submit">Senden</Button>
    </form>
  );
}

export default CommentForm;
