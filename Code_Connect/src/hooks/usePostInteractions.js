import { useState, useCallback, useEffect } from 'react';
import { http } from '../api';

export const usePostInteractions = (initialPost) => {
  const [likes, setLikes] = useState(initialPost?.likes || 0);
  const [comments, setComments] = useState(initialPost?.comments || []);

  useEffect(() => {
    if (initialPost) {
      setLikes(initialPost.likes || 0);
      setComments(initialPost.comments || []);
    }
  }, [initialPost]);

  const handleNewComment = useCallback((comment) => {
    setComments((prevComments) => [comment, ...prevComments]);
  }, []);

  const handleLikeButton = useCallback(async (postId) => {
    try {
      await http.post(`blog-posts/${postId}/like`);
      setLikes((prevLikes) => prevLikes + 1);
    } catch (error) {
      console.error('Erro ao dar like:', error);
    }
  }, []);

  const handleDeleteComment = useCallback(async (commentId) => {
    const isConfirmed = confirm('Tem certeza que deseja remover o comentário?');
    if (isConfirmed) {
      try {
        await http.delete(`comments/${commentId}`);
        setComments((prev) => prev.filter((c) => c.id !== commentId));
      } catch (error) {
        console.error('Erro ao deletar comentário:', error);
      }
    }
  }, []);

  const updateComments = useCallback((newComments) => {
    setComments(newComments);
  }, []);

  const updateLikes = useCallback((newLikes) => {
    setLikes(newLikes);
  }, []);

  return {
    likes,
    comments,
    handleNewComment,
    handleLikeButton,
    handleDeleteComment,
    updateComments,
    updateLikes,
  };
};
