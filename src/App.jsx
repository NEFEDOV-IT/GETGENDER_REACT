import './App.css'
import React, { useEffect, useState } from 'react'
import { Button } from "./button";
import { Input } from "./input"
import { Answer } from './answer'

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
        if (!result.gender) return setName('')
        setGender(result.gender)
        setUser(result.name + ' is')
        setName('')
    }

    return (
        <div>
            <form action="#" className="gender__form">
                <Input
                    saveName={saveName}
                    value={name}
                />
                <br/>
                <Button saveGender={saveGender}/>
            </form>
            <Answer
                user={user}
                gender={gender}
            />
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

