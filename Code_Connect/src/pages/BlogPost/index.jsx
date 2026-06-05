import { useEffect, useState } from 'react';
import styles from './blogpost.module.css';
import { ThumbsUpButton } from '../../components/CardPost/ThumbsUpButton';
import { IconButton } from '../../components/IconButton';
import { IconChat } from '../../components/icons/IconChat';
import { Author } from '../../components/Author';
import Typography from '../../components/Typography';
import { CommentList } from '../../components/CommentList';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router';
import { ModalComment } from '../../components/ModalComment';
import { useNavigate } from 'react-router';
import { http } from '../../API';

export const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);

  const handleNewComments = (comment) => {
    setComments([comment, ...comments]);
  };

  const handleDeleteComment = (commentId) => {
    const isConfirmed = confirm('Deseja realmente excluir este comentário?');

    if (isConfirmed) {
      http
        .delete(`/comments/${commentId}`)
        .then(() => {
          setComments((oldComments) =>
            oldComments.filter((comment) => comment.id !== commentId),
          );
        })
        .catch((error) => {
          console.error('Error deleting comment:', error);
        });
    }
  };

  useEffect(() => {
    http
      .get(`/blog-posts/slug/${slug}`)
      .then((response) => {
        setPost(response.data);
        setComments(response.data.comments);
      })
      .catch((error) => {
        if (error.status == 404) {
          navigate('/not-found');
          return;
        }
      });
  }, [slug, navigate]);

  if (!post) {
    return null;
  }

  return (
    <main className={styles.main}>
      <article className={styles.card}>
        <header className={styles.header}>
          <figure className={styles.figure}>
            <img
              src={post.cover}
              alt={`Capa do post de titulo: ${post.title}`}
            />
          </figure>
        </header>
        <section className={styles.body}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </section>
        <footer className={styles.footer}>
          <div className={styles.actions}>
            <div className={styles.action}>
              <ThumbsUpButton loading={false} />
              <p>{post.likes}</p>
            </div>
            <div className={styles.action}>
              <ModalComment onSuccess={handleNewComments} postId={post?.id} />
              <p>{comments.length}</p>
            </div>
          </div>
          <Author author={post.author} />
        </footer>
      </article>
      <Typography variant='h3'>Código:</Typography>
      <div className={styles.code}>
        <ReactMarkdown>{post.markdown}</ReactMarkdown>
      </div>
      <CommentList comments={comments} onDelete={handleDeleteComment} />
    </main>
  );
};
