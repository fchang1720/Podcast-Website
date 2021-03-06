import Linkify from 'linkify-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client'

import { REMOVE_POST } from '../../utils/mutations';
import { QUERY_REMOVE_POSTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';
import comments from '../CommentList';
import './PostList.css'
import  LikeCounter from './LikeCounter';


const PostList = ( {
  posts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  // if (!posts.length) {
  //   return <h3>No Posts Yet</h3>;
  // }

  const [removePost, { error }] = useMutation(REMOVE_POST, {
    update(cache, { data: { removePost } }) {
      try {
        const { posts } = cache.readQuery({ query: QUERY_REMOVE_POSTS });

        cache.writeQuery({
          query: QUERY_REMOVE_POSTS,
          data: { posts: [removePost, ...posts] },
        });
      } catch (err) {
        console.log(JSON.stringify(err));
      }

      const { me } = cache.readQuery({ query: QUERY_ME });
      console.log(me)
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, posts: [...me.posts, removePost] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(posts[0]._id);

    try {
      const { data } = await removePost({
        variables: {
          postId: posts[0]._id
        },
      });
    } catch (err) {
      console.log(JSON.stringify(err,null,2));
    }
  };

  if (!posts.length) {
    return <h3>No Posts Yet</h3>;

  }


  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="card mb-5">
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
            <div className="card-body bg-light p-4">
              <Linkify>{post.postText}</Linkify>
            </div>
            <LikeCounter/>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/posts/${post._id}`}
            >
              View Comments ({comments.length})
            </Link>
            <form
              className="flex-row justify-center justify-space-between-md align-center"
              onSubmit={handleFormSubmit}
            >
            <button className="btn btn-danger btn-block btn-squared p-2" type="submit">
              Delete Post
            </button>
            </form>
          </div>
        ))}
    </div>
  );
};

export default PostList;