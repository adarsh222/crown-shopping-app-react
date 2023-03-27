import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { FormInput } from "../form-input/form-input.component"
import "./sign-in-form.style.scss";
import Button from "../button/button.component";



const defaultFormFields =
{
    email: '',
    password: '',
};



const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {
        email,
        password,
    } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };
    const resetForm = () => {
        setFormFields(defaultFormFields);
    }
    const signInWithGoogle = async (event) => {
        signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { user } = await signInAuthEmailAndPassword(email, password);
            // setCurrentUser(user);
            // resetForm();

        } catch (e) {
            switch (e.code) {
                case 'auth/user-not-found':
                    alert("email  not found");
                    break;
                case 'auth/wrong-password':
                    alert("password wrong");
                    break;
                default:
                    console.log(e, "error");
            }
        }
    };

    return (
        <div className="sign-in-container">

            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>


                <FormInput label='Email' required type="text" onChange={handleChange} name="email" value={email} />

                <FormInput label='Password' required type="password" onChange={handleChange} name="password" value={password} />
                <div className="buttons-container">
                    <Button type='submit'> Sign In </Button>
                    <Button type='button' onClick={signInWithGoogle} buttonType='google'>Google Sign In </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;