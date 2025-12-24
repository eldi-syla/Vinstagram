import { useEffect, useState } from "react";
import styles from "./FeedRoute.module.css";
import { useCurrentUser } from "../lib/session";
import { fetchPosts, createPost } from "../lib/postApi";
import { uploadImage } from "../lib/imageApi";
import Post from "../components/Post";
import PostForm from "../components/PostForm";

function FeedRoute() {
  const user = useCurrentUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      setLoading(true);
      const data = await fetchPosts();
      setPosts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreatePost({ text, file }) {
    if (!user) return;
    try {
      let imageId = null;
      if (file) {
        imageId = await uploadImage(file);
      }
      const newPost = await createPost({
        authorId: user.id,
        text,
        imageId,
      });
      setPosts((prev) => [newPost, ...prev]);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className={styles.feed}>
      <PostForm onSubmit={handleCreatePost} />
      {loading ? (
        <p>Posts werden geladen...</p>
      ) : posts.length === 0 ? (
        <p>Keine Posts vorhanden.</p>
      ) : (
        <div className={styles.list}>
          {posts.map((p) => (
            <Post key={p.id} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FeedRoute;
