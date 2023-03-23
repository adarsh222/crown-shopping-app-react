import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
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
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label>Display name</label>
                <input required type="text" onChange={handleChange} name="displayName" value={displayName}></input>

                <label>Email</label>
                <input required type="email" onChange={handleChange} name="email" value={email}></input>

                <label>Password</label>
                <input required type="password" onChange={handleChange} name="password" value={password}></input>

                <label> Confirm password</label>
                <input required type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SignUpForm;