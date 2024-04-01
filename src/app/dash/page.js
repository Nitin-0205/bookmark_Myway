"use client";
import styles from "./page.module.css";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [openCatagories, setOpenCatagories] = useState(true);
    const [catagories, setCatagories] = useState([]);
    const [user, setUserId] = useState(null);
    const [search, setSearch] = useState('');
    const Route = useRouter();
    const [bookmark, setBookmark] = useState([{
        category: "unsorted",
        date: "31-3-2024",
        tag: [],
        tags: [''],
        title: "",
        url: "",
        user: "66087837757dbba513ad9f24",
        __v:
            0,
        _id:
            "66087b2914f341732d31f2f1"
    }]);



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
                console.log("dsf")
            })


        getAllbookmark()

    }, [])


    const getAllbookmark = async () => {
        console.log('clicked')
        let response = await fetch(`https://bookmark-backend.vercel.app/bookmark/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('token') || ''
            }
        }).then(response => response.json())

        console.log(response)

        setBookmark([...response])




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

                            openCatagories && catagories.map((catagory, index) => {
                                return <li className={styles.licat} key={index} >{catagory}</li>
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
                            search.length <= 0 ? bookmark.map((setBookmark, ind) => {
                                return (
                                    <div className={styles.setBookmark} key={ind}>
                                        <div className={styles.bookmarkList}>
                                            <div className={styles.bookmarkItem}>
                                                <h6 className={styles.categoryTitle}>catagory : {setBookmark.category}</h6>
                                                <h3>{setBookmark.title}rdtfyghj</h3>
                                                <a href={setBookmark.url} target="_blank">{setBookmark.url.slice(0, 50)}...</a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : bookmark.filter((setBookmark) => {
                                console.log(setBookmark.url.toLowerCase())
                                return (
                                    setBookmark.title.toLowerCase().includes(search.toLowerCase()) ||
                                    setBookmark.category.toLowerCase().includes(search.toLowerCase()) ||
                                    setBookmark.url.toLowerCase().includes(search.toLowerCase())
                                    // setBookmark.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
                                )
                            }).map((setBookmark, ind) => {
                                console.log(setBookmark)
                                return (
                                    <div className={styles.setBookmark} key={ind}>
                                        <div className={styles.bookmarkList}>
                                            <div className={styles.bookmarkItem}>
                                                <h6 className={styles.categoryTitle}>catagory : {setBookmark.category}</h6>
                                                <h3>{setBookmark.title}rdtfyghj</h3>
                                                <a href={setBookmark.url} target="_blank">{setBookmark.url.slice(0, 50)}...</a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>

            </div>
        </div>

    );
}