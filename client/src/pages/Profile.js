import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4 className='my-5 pt-4'>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div className='profile-posts'>
      <div className="flex-row justify-center pt-2">
        <h2 className="col-12 col-md-12 bg-dark text-light p-3 my-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile!
        </h2>

        {!userParam && (
          <div
            className="col-12 col-md-12 mb-4 p-4"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <PostForm />
          </div>
        )}

        <div className="col-12 col-md-12 mb-5">
          <PostList
            posts={user.posts}
            title={`${user.username}'s posts...`}
            showTitle={false}
            showUsername={false}
          />
        </div>
       
      </div>
    </div>
  );
};

export default Profile;