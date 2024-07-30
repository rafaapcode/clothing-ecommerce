import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/user.context';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import "./sign-up-form.styles.scss";

const deafultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(deafultFormFields);
  const {confirmPassword, displayName, email, password} = formFields;

  const {setCurrentUser} = useContext(UserContext);

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
      setCurrentUser(user);
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
    <div className='sign-up-container'>
      <h2>Don't have an account ?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={onSubmit}>
        <FormInput label="Display Name" required type="text" name='displayName' onChange={handleChange} value={displayName}/>

        <FormInput label="Email" required type="email" name='email' onChange={handleChange} value={email}/>

        <FormInput label="Password" required type="password" name='password' onChange={handleChange} value={password}/>

        <FormInput label="Confirm Password" required type="password"  name='confirmPassword' onChange={handleChange} value={confirmPassword}/>

        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm