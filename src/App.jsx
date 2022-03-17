import './App.css'
import React, { useState } from 'react'

const URL = 'https://api.genderize.io'

function getUrl(item, firstName) {
    return `${item}?name=${firstName}`
}

async function getGender(userName) {
    const response = await fetch(getUrl(URL, userName))
    return await response.json()
}

function FormSend() {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [user, setUser] = useState('')

    function saveName(e) {
        setName(e.target.value)
    }

    async function saveGender(e) {
        e.preventDefault()
        const result = await getGender(name)
        if (!result.gender) return
        setGender(result.gender)
        setUser(result.name + ' is')
    }

    return (
        <div>
            <form action="#" className="gender__form">
                <input
                    onChange={saveName}
                    placeholder="Enter your name..."
                    type="text"
                    className='gender__input'
                />
                <br/>
                <button
                    onClick={saveGender}
                    type="submit"
                    className="gender__button">
                    Send
                </button>
            </form>
            <p>Gender: {user} <span className="gender__answer">{gender}</span></p>
        </div>
    )
}

function App() {

    return (
        <div className="wrapper">
            <header className="header">GET GENDER</header>

            <main className="main">
                <h1>Find the gender from a name:</h1>
                <FormSend/>
            </main>

            <footer className="footer">2022</footer>
        </div>
    )
}

export default App

