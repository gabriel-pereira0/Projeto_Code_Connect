import { useState } from 'react';

import { Author } from '../Author';
import styles from './cardpost.module.css';

import { ThumbsUpButton } from './ThumbsUpButton';
import { ModalComment } from '../ModalComment';
import { Link } from 'react-router';

export const CardPost = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const handleNewComments = (newComment) => {
    setComments([comment, ...comments]);
  };

  const handleLike = () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('Faça login para curtir o post!');
      return;
    }
    fetch(`http://localhost:3000/blog-posts/${post.id}/like`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
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
            <ThumbsUpButton loading={false} onClick={handleLike} />
            <p>{likes}</p>
          </div>
          <div className={styles.action}>
            <ModalComment />
            <p>{comments.length}</p>
          </div>
        </div>
        <Author author={post.author} />
      </footer>
    </article>
  );
};
