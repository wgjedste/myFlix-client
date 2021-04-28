import React, { useState } from "react";
import Proptypes from "prop-types";

export function RegistrationView(props) { 
  const [username, setUsername] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [email, setEmail] = useState(" "); 
  const [birthdate, setBirthdate] = useState(" ");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthdate);
    props.onRegister(username);
  };

  <Form>
    {" "}
    <Form.Group controlId="registerUsername">
      <Form.Label>Username:</Form.Label>
      {" "}
      <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} />
      {" "}
    </Form.Group>
    {" "}
    <Button variant="primary" type="submit" onClick={handleSubmit}>
       Submit //{" "}
    </Button>
    {" "}
  </Form>;
}

RegistrationView.Proptypes = {
  onRegister: Proptypes.func.isRequired,
};
