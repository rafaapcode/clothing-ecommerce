import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import { createUserDocumentFromAuth, signInWithGooglePopup } from '../../utils/firebase.utils';

export default function SignIn() {
  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>
        Sign In With Popup
      </button>
      <SignUpForm />
    </div>
  );
}
