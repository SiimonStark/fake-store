import { login } from 'store/slices/app';
import classes from './signin.module.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoginState, setLoggedIn } from 'store/slices/app';

export default function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    function onSubmit(e) {
        e.preventDefault();
        login(username, password);
    }

    return (
        <div className={classes.signIn}>
            <form>
                <label>Username
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type={'text'} />
                </label>
                <label>Password
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={'password'} />
                </label>
                <button type={'submit'} onClick={(e) => onSubmit(e)}>
                    Sign In
                </button>
            </form>
        </div>
    )
}