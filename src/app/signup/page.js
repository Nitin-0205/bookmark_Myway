"use client";
import React from 'react';
import Head from 'next/head';
import styles from './page.module.css';
import Link from 'next/link'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const response = await fetch('https://bookmark-backend.vercel.app/signup', {
        const response = await fetch('http://localhost:8000/signup', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        });
        console.log("response", response)

        if (response.status === 200) {
            const data = await response.json();
            console.log("data", data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('data', JSON.stringify(data));
            Router.push('/dash');

        } else {
            const data = await response.json();
            console.log("data", data);
            alert(data.err);
            setEmail('')

        }

    }

    return (
        <div id={styles.majorCont}>
            <div id={styles.container}>
                <Head>
                    <title>Signup</title>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
                </Head>
                <form id={styles.signupForm}>
                    <h1 className='h1'>Signup</h1>
                    <div className={styles.form_group}>
                        <label>Email</label>
                        <input type="email" id="email" className={styles.fields} required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label>Username</label>
                        <input type="text" id="username" className={styles.fields} required
                            value={username}
                            onChange={(e) => { console.log(e.target.value); return setUsername(e.target.value) }} />
                    </div>

                    <div className={styles.form_group}>
                        <label>Password</label>
                        <input type="password" id="password" className={styles.fields} name="password" required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles.form_group}>
                        <Link id={styles.loginBtn} href={`/`}>Login</Link>
                        <button type="submit" id={styles.submitBtn} onClick={handleSubmit}>Signup</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;