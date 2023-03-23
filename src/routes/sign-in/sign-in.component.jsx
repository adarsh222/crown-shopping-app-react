import { auth, signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect } from "../../utils/firebase/firebase.utils";
import { useEffect } from "react";
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
const SignIn = () => {
    useEffect(() => {
        (async () => {
            const response = await getRedirectResult(auth);
            if (response) {
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        })();
    }, []);

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);

    }

    const logGoogleRedirectUser = async () => {
        const { user } = await signInWithGoogleRedirect();
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    return (
        <div className=''>
            <h1>Sign in</h1>
            <button onClick={logGoogleUser}>Signin with google popup</button>
            {/* <button onClick={logGoogleRedirectUser}>Signin with google redirect</button> */}
            <SignUpForm/>

        </div>
    );
};

export default SignIn;