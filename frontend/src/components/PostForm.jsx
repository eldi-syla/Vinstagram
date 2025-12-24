import { useState } from "react";
import styles from "./PostForm.module.css";
import Button from "./Button";

function PostForm({ onSubmit }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() && !file) return;
    onSubmit({ text, file });
    setText("");
    setFile(null);
    e.target.reset();
  };

  return (
    <form className={styles.postForm} onSubmit={handleSubmit}>
      <h2>Neuer Post</h2>
      <textarea
        className={styles.textarea}
        rows={3}
        placeholder="Was gibt's Neues?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className={styles.footer}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0] || null)}
        />
        <Button type="submit">Posten</Button>
      </div>
    </form>
  );
}

export default PostForm;
