import React, { useState } from 'react'
import HomePage from './Components/HomePage/HomePage'
import NavBar from './Components/Common/NavBar'
import HomePostDetail from './Components/HomePage/HomePostDetail'


export default function App1() {
    const [page, setPage] = useState('/');
    const handlePage = (newPage) => {
        setPage(newPage);
    }
    return (

        <>
            {page === '/' && <HomePage handlePage={() => handlePage('comment')} />}
            {page === 'comment' && <HomePostDetail />}
            <NavBar />

        </>

    )
}

