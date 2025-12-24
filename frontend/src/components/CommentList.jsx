import styles from "./CommentList.module.css";

function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <p className={styles.empty}>Noch keine Kommentare.</p>;
  }

  return (
    <ul className={styles.list}>
      {comments.map((c) => (
        <li key={c.id} className={styles.item}>
          <div className={styles.header}>
            <span className={styles.author}>@{c.authorUsername}</span>
            {c.createdAt && (
              <span className={styles.date}>
                {new Date(c.createdAt).toLocaleString()}
              </span>
            )}
          </div>
          <div className={styles.text}>{c.text}</div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
