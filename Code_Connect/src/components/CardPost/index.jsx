import { useState } from 'react';
import { http } from '../../API';
import { useAuth } from '../../hooks/useAuth';
import { usePostInteractions } from '../../hooks/usePostInteractions';

import { Author } from '../Author';
import styles from './cardpost.module.css';

import { ThumbsUpButton } from './ThumbsUpButton';
import { ModalComment } from '../ModalComment';
import { Link } from 'react-router';

export const CardPost = ({ post }) => {
  const {
    likes,
    comments,
    handleNewComment,
    handleLikeButton,
    handleDeleteComment,
  } = usePostInteractions(post);

  const { isAuthenticated } = useAuth();

  const onLikeButtonClick = () => {
    handleLikeButton(post.id);
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
              onClick={onLikeButtonClick}
              disabled={!isAuthenticated}
            />
            <p>{likes}</p>
          </div>
          <div className={styles.action}>
            <ModalComment onSuccess={handleNewComment} postId={post.id} />
            <p>{comments.length}</p>
          </div>
        </div>
        <Author author={post.author} />
      </footer>
    </article>
  );
};
