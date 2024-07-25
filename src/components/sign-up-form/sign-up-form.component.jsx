import React, { useState } from 'react';

const deafultFormFields = {
  displaName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(deafultFormFields);
  const {confirmPassword, displaName, email, password} = formFields;

  const handleChange = (event) => {
    const {name,value} = event.target;
  
    setFormFields((prev) => ({...prev, [name]: value}))
  };

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={() => {}}>
        <label>Display Name</label>
        <input required type="text" name='displaName' onChange={handleChange} value={displaName}/>

        <label>Email</label>
        <input required type="email" name='email' onChange={handleChange} value={email}/>

        <label>Password</label>
        <input required type="password" name='password' onChange={handleChange} value={password}/>

        <label>Confirm Password</label>
        <input required type="password"  name='confirmPassword' onChange={handleChange} value={confirmPassword}/>

        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm