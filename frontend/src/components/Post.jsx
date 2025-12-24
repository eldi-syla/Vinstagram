import { useEffect, useState } from "react";
import styles from "./Post.module.css";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { fetchCommentsByPost, createComment } from "../lib/commentApi";
import { useCurrentUser } from "../lib/session";
import { getImageUrl } from "../lib/imageApi";

function Post({ post }) {
  const user = useCurrentUser();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.id]);

  async function loadComments() {
    try {
      const data = await fetchCommentsByPost(post.id);
      setComments(data);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleAddComment(text) {
    if (!user) return;
    try {
      const newComment = await createComment({
        postId: post.id,
        authorId: user.id,
        text,
      });
      setComments((prev) => [...prev, newComment]);
    } catch (e) {
      console.error(e);
    }
  }

  const imageUrl = post.imageId ? getImageUrl(post.imageId) : null;

  return (
    <article className={styles.post}>
      <header className={styles.header}>
        <span className={styles.author}>@{post.authorUsername}</span>
        {post.createdAt && (
          <span className={styles.date}>
            {new Date(post.createdAt).toLocaleString()}
          </span>
        )}
      </header>

      <p className={styles.text}>{post.text}</p>

      {imageUrl && (
        <div className={styles.imageWrapper}>
          <img src={imageUrl} alt="Post" className={styles.image} />
        </div>
      )}

      <section className={styles.comments}>
        <CommentList comments={comments} />
        {user && <CommentForm onSubmit={handleAddComment} />}
      </section>
    </article>
  );
}

export default Post;
