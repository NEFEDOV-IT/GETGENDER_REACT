import './App.css'
import React from 'react'

const URL = 'https://api.genderize.io'

const STATE = {
    COLOR: 'rgba(20,0,255,0.85)',
    ERROR_NAME: 'Please enter more than 2 characters',
}

function getUrl(item, firstName) {
    return `${item}?name=${firstName}`
}

async function getGender(userName) {
    const inputGender = document.querySelector('.gender__input')

    if (!userName) return inputGender.classList.add('error')

    if (inputGender.classList.contains('error')) {
        inputGender.classList.remove('error')
    }

    const fullUrl = getUrl(URL, userName)
    const response = await fetch(fullUrl)
    const gender = await response.json()
    return gender.gender
}

class FormSend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({value: e.target.value})
    }

    handleSubmit(e) {
        this.props.sendValue(this.state.value)
        e.preventDefault()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} action="#" className="gender__form">
                <input value={this.state.value} onChange={this.handleChange} placeholder="Enter your name..." type="text" className="gender__input"/>
                <br/>
                <button type="submit" className="gender__button">Send</button>
            </form>
        )
    }
}

function AnswerGender(props) {
    let gender = props.gender
    let name = props.name
    let stateStyle

    if (gender === null) gender = 'unknown'

    if (name.length < 2) {
        name = '';
        gender = STATE.ERROR_NAME;
        stateStyle = <span style={{color: STATE.COLOR}}>{gender}</span>;
        return <p>Gender: {name} {stateStyle}</p>
    }

    if (name.trim()) {
        name += " is"
    } else name = STATE.ERROR_NAME
    stateStyle = <span className="gender__answer">{gender}</span>

    return (
        <p>Gender: {name} {stateStyle}</p>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', gender: ''}
        this.getValue = this.getValue.bind(this)
    }

    async getValue(value) {
        const infoGender = await getGender(value)
        this.setState({name: value})
        this.setState({gender: infoGender})
    }

    render() {
        return (
            <div className="wrapper">
                <header className="header">GET GENDER</header>

                <main className="main">
                    <h1>Find the gender from a name:</h1>
                    <FormSend sendValue={this.getValue} />
                    <AnswerGender
                        name={this.state.name}
                        gender={this.state.gender}
                    />
                </main>

                <footer className="footer">NEFEDOV_IT</footer>
            </div>
        )
    }
}

export default App

