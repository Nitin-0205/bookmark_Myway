"use client";
import styles from "./page.module.css";
import Link from 'next/link';
import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const handleClick = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const res = await fetch("https://bookmark-backend.vercel.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (res.status === 200) {
      alert("Login success");
      const data = await res.json();
      console.log(data)
      localStorage.setItem("data", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      router.push('/dash')
    } else {
      alert("Login failed");
    }
  }
  return (
    <div id={styles.majorCont}>
      <div id={styles.container}>

        <form id={styles.signupForm}>
          <h1 className='h1'>Log In</h1>
          <div className={styles.form_group}>
            <label>Email</label>
            <input type="email" id="email" className={styles.fields} name="email" required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className={styles.form_group}>
            <label>Password</label>
            <input type="password" id="password" className={styles.fields} name="password" required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className={styles.form_group}>
            <Link id={styles.submitBtn} href={`/signup`}>Signup</Link>
            <button type="submit" id={styles.loginBtn} onClick={handleClick} >Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
