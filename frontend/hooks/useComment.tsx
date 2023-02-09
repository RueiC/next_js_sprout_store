import { useEffect, useState } from 'react';
import { CommentType } from '../types';
import { client } from '../utils/client';
import { getComments } from '../utils/queries';

const useComment = (id: string) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [comments, setComments] = useState<CommentType[] | null>(null);
  const [totalComments, setTotalComments] = useState<CommentType[] | null>(
    null,
  );

  const fetchComments = async (): Promise<void> => {
    const query: string = getComments(id);
    const result = await client.fetch(query).then((data) => data[0].comments);

    setTotalComments(result);
  };

  useEffect(() => {
    if (!totalComments) return;

    const setPagination = async () => {
      if (currentPage === 1) {
        const startItem: number = 0;
        const endItem: number = 5;
        const newComment: CommentType[] = totalComments.slice(
          startItem,
          endItem,
        );
        setComments(newComment);
      } else if (currentPage > 1) {
        const endItem = 5 * currentPage;
        const startItem = endItem - 5;
        const newComment: CommentType[] = totalComments.slice(
          startItem,
          endItem,
        );
        setComments(newComment);
      }
    };

    setPagination();
  }, [currentPage, totalComments]);

  useEffect(() => {
    fetchComments();
  }, []);

  return {
    comments,
    totalComments,
    currentPage,
    setCurrentPage,
    fetchComments,
    setComments,
  };
};

export default useComment;
