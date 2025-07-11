import React, { useCallback, useMemo, useState } from 'react'

const API1 = () => {
    const [apiData, setApidata] = useState([])
    const [loading, setLoading] = useState([])
    const [error, setError] = useState([])
    const url = "https://jsonplaceholder.typicode.com/users"

    useCallback(() => {
        async function fetchData() {
            setLoading(true)
            try {
                // simulate delay
                let users = await fetch(url);
                if (!users.ok) throw new Error("api failed");
                users = await users.json();
                setApidata(users)
            } catch (err) {
                console.log(err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])


    if (loading) return <h1>Loading...</h1>
    if (error && apiData?.length === 0) return <h1>Somethin went wrong...</h1>

    return (
        <div>
            <ul>
                {apiData?.map((val, index) => (
                    <li key={index}>{val?.username}</li>
                ))}
            </ul>
        </div>
    )
}

export default API1