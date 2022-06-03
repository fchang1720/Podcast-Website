import React from 'react';
import { useMutation } from '@apollo/client';

import { REMOVE_COMMENT } from '../../utils/mutations';

import Auth from '../../utils/auth'

const CommentList = ({ comments = [] }) => {

  const [removeComment, { error }] = useMutation(REMOVE_COMMENT);
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await removeComment({
        variables: {
          comments,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

    } catch (err) {
      // console.error(err);
    }
    }
  
  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Comments({comments.length})
      </h3>
      <form
        className="delete-box flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
      <div className="flex-row my-4">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  {comment.commentAuthor} commented{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {comment.createdAt}
                  </span>
                </h5>
                <p className="card-body">{comment.commentText}</p>
              </div>
                <button className="btn btn-primary btn-block py-3" type="submit">
                  Delete Comment
                </button>
            </div>
          ))}
      </div>
      </form>
    </>
  );
};

export default CommentList;