import { auth, signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect } from "../../utils/firebase/firebase.utils";
import { useEffect } from "react";
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form";
import "./authentication.styles.scss";
const Authentication = () => {
    // useEffect(() => {
    //     (async () => {
    //         const response = await getRedirectResult(auth);
    //         if (response) {
    //             const userDocRef = await createUserDocumentFromAuth(response.user);
    //         }
    //     })();
    // }, []);

    return (
        <div className='authentication-container'>


            <SignInForm/>
            <SignUpForm/>

        </div>
    );
};

export default Authentication;