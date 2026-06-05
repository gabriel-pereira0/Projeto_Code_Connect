import { useState } from 'react';
import { http } from '../../API';
import { useAuth } from '../../hooks/useAuth';

import { Author } from '../Author';
import styles from './cardpost.module.css';

import { ThumbsUpButton } from './ThumbsUpButton';
import { ModalComment } from '../ModalComment';
import { Link } from 'react-router';

export const CardPost = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);

  const handleNewComments = (comment) => {
    setComments([comment, ...comments]);
  };
  const { isAuthenticated } = useAuth();

  const handleLike = () => {
    const token = localStorage.getItem('access_token');
    setLikes((oldlikes) => oldlikes + 1);

    http.post(`/blog-posts/${post.id}/like`, {}).then((response) => {
      if (response.ok) {
        setLikes((oldlikes) => oldlikes + 1);
      }
    });
  };

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <figure className={styles.figure}>
          <img src={post.cover} alt={`Capa do post de titulo: ${post.title}`} />
        </figure>
      </header>
      <section className={styles.body}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <Link to={`/blog-posts/${post.slug}`}>Ver detalhes</Link>
      </section>
      <footer className={styles.footer}>
        <div className={styles.actions}>
          <div className={styles.action}>
            <ThumbsUpButton
              loading={false}
              onClick={handleLike}
              disabled={!isAuthenticated}
            />
            <p>{likes}</p>
          </div>
          <div className={styles.action}>
            <ModalComment onSuccess={handleNewComments} postId={post.id} />
            <p>{comments.length}</p>
          </div>
        </div>
        <Author author={post.author} />
      </footer>
    </article>
  );
};
