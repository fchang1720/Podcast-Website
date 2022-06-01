import React from 'react';
import { useQuery } from '@apollo/client';

import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

import { QUERY_POSTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  return (
    <main>

      <div className='homepage-container'>

        <h1 className='homepage-title'>Welcome!</h1>
        <hr />
        <p className='homepage-message'>This site is a place to share your own podcasts.
        Feel free to create your own posts, as well as comment on others!
        Be as creative as you can be, and have fun!
        </p>

      </div>

      <div className="flex-row justify-center">

        {/* <div className="col-12 col-md-10 mb-3 p-3" style={{ border: '1px dotted #1a1a1a' }}>
          <a href='/me'>Create a post!</a>
          {/* <PostForm /> */}
        {/* </div> */}

        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PostList posts={posts} title="See what others are posting below!"/>
          )}
        </div>

      </div>

    </main>
  );
};

export default Home;