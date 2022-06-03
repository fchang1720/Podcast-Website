import React from 'react';
import { useQuery } from '@apollo/client';

import './assets/Home.css'
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

import { QUERY_POSTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  return (
    <main>

      <div className='home-container'>

        <h1 className='home-title'>Welcome!</h1>
        <hr />
        <p className='home-message'>This site is a place to share your own podcasts.
        Feel free to create your own posts, as well as comment on others!
        Be as creative as you can be, and have fun!
        </p>

      </div>

      <div className="postBox flex-row justify-center">

        {/* <div className="col-12 col-md-10 mb-3 p-3" style={{ border: '1px dotted #1a1a1a' }}>
          <a href='/me'>Create a post!</a>
          {/* <PostForm /> */}
        {/* </div> */}
        <div>
        <h2>Podcast of the Week</h2>
          <iframe id="myFrame" width="420" height="345" src='https://www.youtube.com/embed/fb5ELWi-ekk'>fgh</iframe>
        </div>

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