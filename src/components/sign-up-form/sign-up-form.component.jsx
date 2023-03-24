import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import {FormInput} from "../form-input/form-input.component"
import "./sign-up-form.style.scss";
import Button from "../button/button.component";


const defaultFormFields = 
    {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    };



const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {
        displayName,
        email,
        password,
        confirmPassword
    } = formFields;
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };
    const resetForm =()=>{
        setFormFields(defaultFormFields);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("password do not match");
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetForm();
            
        } catch (e) {
            console.log(e, "error");
            if (e.code === 'auth/email-already-in-use') {
                alert("email already in use");
            }
        }
    };

    return (
        <div className="sign-up-container">
            <h2>Dont have an account?</h2>
            <span>Sign Up with email and password</span>
            <form onSubmit={handleSubmit}>
  
                <FormInput label='Display name' required type="text" onChange={handleChange} name="displayName" value={displayName}/>

                <FormInput label='Email' required type="text" onChange={handleChange} name="email" value={email}/>

                <FormInput label='Password' required type="password" onChange={handleChange} name="password" value={password}/>

                <FormInput label='Confirm password' required type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
                <Button > Sign up </Button>
            </form>
        </div>
    )
}

export default SignUpForm;