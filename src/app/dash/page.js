"use client";
import styles from "./page.module.css";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [openCatagories, setOpenCatagories] = useState(true);
    const [catagories, setCatagories] = useState([]);
    const [user, setUserId] = useState(null);
    const Route = useRouter();

    useEffect(() => {


        // fetch('https://bookmark-backend.vercel.app/catagories', {
        //query the backend for the catagories
        console.log(localStorage.getItem('token'))
        const userId = JSON.parse(localStorage.getItem('data')).id
        setUserId(userId)
        fetch(`https://bookmark-backend.vercel.app/catagory/name/?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('token') || ''
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                setCatagories(data)
            })
    }, [])

    const getAllbookmark = () => {
        fetch(`https://bookmark-backend.vercel.app/bookmarks/?userId=${user}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('token') || ''
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                setCatagories(data)
            })
    }




    return (
        <div id={styles.container}>
            <div id={styles.sidenav}>
                <div>
                    <h1>Chrome Book</h1>
                    <p>Welcome to the site Bookmark.</p>
                </div>
                <a id={styles.catagoryTitle} onClick={getAllbookmark}> All </a>
                <div>
                    <a id={styles.catagoryTitle} onClick={() => { setOpenCatagories(!openCatagories) }}>
                        {
                            openCatagories ? <span className={styles.icon}>&#9660;</span> : <span className={styles.icon}>&#9654;</span>
                        }
                        Catagory</a>
                    {
                        openCatagories && <ul >
                            {catagories.map(catagory => {
                                return <li className={styles.licat} key={catagory.id}>{catagory}</li>
                            })}
                        </ul>
                    }
                </div>


            </div>
            <div id={styles.main}>
                <div id={styles.search}>
                    <input type="text" placeholder="Search" />
                    <button>Search</button>
                </div>

                <div id={styles.bookmark}>
                    <div id={styles.bookmarkContent}>
                        <div className={styles.bookmarkCard}>
                            <h1>Google</h1>
                            <p>https://www.google.com</p>
                        </div>
                        <div className={styles.bookmarkCard}>
                            <h1>Facebook</h1>
                            <p>https://www.facebook.com</p>
                        </div>
                        <div className={styles.bookmarkCard}>
                            <h1>Twitter</h1>
                            <p>https://www.twitter.com</p>
                        </div>
                        <div className={styles.bookmarkCard}>
                            <h1>Instagram</h1>
                            <p>https://www.instagram.com</p>
                        </div>
                        <div className={styles.bookmarkCard}>
                            <h1>Youtube</h1>
                            <p>https://www.youtube.com</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    );
}