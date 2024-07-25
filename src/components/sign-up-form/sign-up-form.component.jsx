import React, { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase.utils';

const deafultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(deafultFormFields);
  const {confirmPassword, displayName, email, password} = formFields;

  const resetFormFields = () => {
    setFormFields(deafultFormFields);
  }

  const handleChange = (event) => {
    const {name,value} = event.target;
  
    setFormFields((prev) => ({...prev, [name]: value}))
  };

  const onSubmit = async (event) => {
    event.preventDefault();
      
    if(password !== confirmPassword) {
      alert("Your password does not match");
      return;
    }

    try {
      const {user} = await createAuthUserWithEmailAndPassword(email, password);

      await createUserDocumentFromAuth(user, {displayName});
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("User creation error: ",error.message);
      }
    }
  }

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={onSubmit}>
        <label>Display Name</label>
        <input required type="text" name='displayName' onChange={handleChange} value={displayName}/>

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