import React, { useState, useEffect } from 'react';

const NewsPage = () => {

    const [news, setNews] = useState([])
    const [search, setSearch] = useState("react")
    const [url, setUrl] = useState("https://hn.algolia.com/api/v1/search?query='react'")

    const findNews = () => {
        const newsApi = `https://hn.algolia.com/api/v1/search?query=${search}`
        fetch(newsApi).then(result => result.json())
            .then(data => setNews(data.hits))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        findNews()
    }, [url])

    const makeChange = (e) => {
        setSearch(e.target.value)
    }

    const handleInput = (e) => {
        e.preventDefault()
        setUrl(`https://hn.algolia.com/api/v1/search?query=${search}`)
    }
    return (
        <div>
            <h1>Search Hacker News</h1>
            <form onSubmit={handleInput}>
                <input type="text" value={search} onChange={makeChange}></input>
                <button>Search</button>
            </form>
            {news.map((n, i) => {
                return <p id='para' key={i}>{n.title}</p>
            })}

        </div>

    )
}

export default NewsPage;