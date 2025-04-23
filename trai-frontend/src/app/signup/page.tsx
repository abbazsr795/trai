"use client"

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../(store)/store";
import { setEmail, setPassword, setToken, clearEmail, clearPassword, clearToken } from "../(store)/slices/credentials";
import supabase from "../(supabase)/config";

export default function SignUp() {

    const email = useSelector((state: RootState) => state.credentials.email);
    const password = useSelector((state: RootState) => state.credentials.password);
    const token = useSelector((state: RootState) => state.credentials.token);
    const dispatch = useDispatch();

    const handleSignUp = async () => {
        let { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        })
        
        clearEmail();
        clearPassword();
    }

    return(
        <div>
            <h1>email</h1>
            <input type="text" placeholder="Email" onChange={(e) => dispatch(setEmail(e.target.value))} />
            <h1>password</h1>
            <input type="password" placeholder="Password" onChange={(e) => dispatch(setPassword(e.target.value))} />
            <button onClick={() => handleSignUp()}>Submit</button>
        </div>
    )
}