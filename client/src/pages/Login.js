import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import './assets/Login.css'

import Auth from '../utils/auth';
import Form from 'react-bootstrap/Form';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="login-container flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Login</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head back to the{' '}
                <Link to="/">homepage.</Link>
              </p>
            ) : 
          // form inputs for the login page
          <Form onSubmit={handleFormSubmit}>  
          <Form.Group className="mb-3 form-input" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name='email' value={formState.email} onChange={handleChange}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

        <Form.Group className="mb-3 form-input" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="******" name='password' value={formState.password} onChange={handleChange}/>
        </Form.Group>
        
        <button variant="primary" type="submit" className="btn btn-block btn-primary">
            Submit
        </button>
        </Form>
            // (
            //   <form onSubmit={handleFormSubmit}>
            //     <input
            //       className=" mb -3 form-input"
            //       placeholder="Your email"
            //       name="email"
            //       type="email"
            //       value={formState.email}
            //       onChange={handleChange}
            //     />
            //     <input
            //       className="form-input"
            //       placeholder="******"
            //       name="password"
            //       type="password"
            //       value={formState.password}
            //       onChange={handleChange}
            //     />
            //     <button
            //       className="btn btn-block btn-primary"
            //       style={{ cursor: 'pointer' }}
            //       type="submit"
            //     >
            //       Submit
            //     </button>
            //   </form>
            // )
           
            }
       

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

export default Login;