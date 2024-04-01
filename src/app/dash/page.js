"use client";
import styles from "./page.module.css";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [openCatagories, setOpenCatagories] = useState(true);
    const [catagories, setCatagories] = useState(["unsorted", "movies"]);
    const [user, setUserId] = useState(null);
    const [search, setSearch] = useState('');
    const Route = useRouter();
    const [bookmark, setBookmark] = useState([]);



    useEffect(() => {
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

        // allCategory(userId)


    }, [])


    const getAllbookmark = async () => {
        console.log('clicked')
        let response = await fetch(`http://localhost:8000/bookmark/?userId=66086bff0a1c9448458ee13b`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('token') || ''
            }
        }).then(response => response.json())




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
                    <ul className={styles.catlist} >
                        {
                            openCatagories && catagories.map(catagory => {
                                return <li className={styles.licat} key={catagory.id} >{catagory}</li>
                            })


                        }</ul>
                </div>


            </div>
            <div id={styles.main}>
                <div id={styles.search}>
                    <input type="text" placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button onClick={() => {

                    }}>Search</button>
                </div>

                <div id={styles.bookmark}>
                    <div id={styles.bookmarkContent}>
                        {
                            search.length <= 0 ? catagories.map(setBookmark => {
                                return <div className={styles.setBookmark} key={setBookmark.id}>
                                    <h2>{setBookmark}</h2>
                                    <div className={styles.bookmarkList}>
                                        <div className={styles.bookmarkItem}>
                                            <a href="https://www.google.com" target="_blank">Google</a>
                                            <p>Google is the best search engine</p>
                                        </div>
                                        <div className={styles.bookmarkItem}>
                                            <a href="https://www.youtube.com" target="_blank">Youtube</a>
                                            <p>Youtube is the best video platform</p>
                                        </div>
                                    </div>
                                </div>
                            }) : <></>
                        }
                    </div>

                </div>

            </div>
        </div>

    );
}