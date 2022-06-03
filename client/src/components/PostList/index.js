import Linkify from 'linkify-react';
import React from 'react';
import { Link } from 'react-router-dom';
import comments from '../CommentList';
import './PostList.css'
import  LikeCounter from './LikeCounter';


const PostList = ( {
  posts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!posts.length) {
    return <h3>No Posts Yet</h3>;

  }


  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="card mb-3">
            <h4 className="card-header bg-warning text-dark p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-dark text-center"
                  to={`/profiles/${post.postAuthor}`}
                >
                  {post.postAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    created this post on {post.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You created this post on {post.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <Linkify>{post.postText}</Linkify>
            </div>
            <LikeCounter/>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/posts/${post._id}`}
            >
              View Comments ({comments.length})
            </Link>
            
          </div>
        ))}
    </div>
  );
};

export default PostList;