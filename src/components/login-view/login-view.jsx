// import React, { useState } from 'react';

// export function LoginView(props) {
//   const [ username, setUsername ] = useState('');
//   const [ password, setPassword ] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(username, password);
//     /* Send a request to the server for authentication */
//     /* then call props.onLoggedIn(username) */
//     props.onLoggedIn(username);
//   };

//   return (
//     <form>
//       <label>
//         Username:
//         <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
//       </label>
//       <label>
//         Password:
//         <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
//       </label>
//       <button type="submit" onClick={handleSubmit}>Submit</button>
//     </form>
//   );
// }

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://willsmovies.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };




  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}
