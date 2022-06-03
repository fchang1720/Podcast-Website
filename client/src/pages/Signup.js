import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import './assets/Signup.css'

import Auth from '../utils/auth';
import Form from 'react-bootstrap/Form';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-12">
        <div className="card">
          <h4 className="card-header bg-dark text-dark p-2">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="col-8 col-lg-8 mt-2 p-2 form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <input
                  className="col-8 col-lg-8 mt-2 p-2 form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="col-8 col-lg-8 mt-2 p-2 form-input"
                  placeholder="Enter a password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block mt-3 btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

             {/* // form inputs for the signup page */}
          {/* username input */}
          <Form onSubmit={handleFormSubmit}>  
          <Form.Group className="mb-3 form-input" controlId="">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter your username" name='username' value={formState.name} onChange={handleChange}/>
          </Form.Group>
          {/* email input */}
          <Form.Group className="mb-3 form-input" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name='email' value={formState.email} onChange={handleChange}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
              {/* password input */}
        <Form.Group className="mb-3 form-input" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="******" name='password' value={formState.password} onChange={handleChange}/>
        </Form.Group>
        
        <button variant="primary" type="submit" className="btn btn-block btn-primary">
            Submit
        </button>
        </Form>
            
            

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;