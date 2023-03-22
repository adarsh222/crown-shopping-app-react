import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
const SignIn = () => {

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);

    }
    return (
        <div className=''>
            <h1>Sign in</h1>
            <button onClick={logGoogleUser}>Signin with google popup</button>
        </div>
    );
};

export default SignIn;