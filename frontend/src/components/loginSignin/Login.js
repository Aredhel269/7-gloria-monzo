import React, { useState } from 'react'
import { socket } from '../../context/reducer'
import { store } from '../../context/store'
import { logInOut, userName } from '../../context/actions'
import { useLocation } from 'react-router-dom'
import WarningModal from '../warningModal/WarningModal'
import logo from '../../img/xat-logo.png'
import './loginSignin.css'
import axios from 'axios'

export default function LoginSignin() {
    const [loginName, setLoginName] = useState("")
    const [loginPass, setLoginPass] = useState("")
    const [signName, setSignName] = useState("")
    const [signPass, setSignPass] = useState("")
    const [warningModal, setWarningModal] = useState(false)
    const [warninbgMsg, setWarningMsg] = useState("")
    const { pathname } = useLocation()

    const login = async () => {
        const user = {
            name: loginName,
            pass: loginPass
        }
        const response = await axios.post('/api/gettoken', { name: loginName })
        localStorage.setItem('token', response.data)
        socket.emit('login', user, socket.id)
        socket.on('login-atempt', (isSigned) => {
            if (isSigned) {
                socket.emit('join-room', { name: 'sala principal' }, 'none', loginName)
                socket.emit('user-joined-room-message', pathname, loginName)
                store.dispatch(userName(loginName))
                store.dispatch(logInOut(true))
                setLoginName("")
                setLoginPass("")
            } else {
                setWarningModal(true)
                setTimeout(() => {
                    setWarningModal(false)
                    setWarningMsg("")
                }, 1500)
                setWarningMsg("Username or password incorrect")
            }
        })
    }

    const signUp = () => {
        let ok = true
        function onlyLettersAndNumbers(str) {
            return /^[A-Za-z0-9][/^\S*$/]*$/.test(str);
        }
        const okName = onlyLettersAndNumbers(signName)
        const okPass = onlyLettersAndNumbers(signPass)
        if (okName === false) ok = false
        if (okPass === false) ok = false
        if (!ok) {
            setWarningModal(true)
            setTimeout(() => {
                setWarningModal(false)
                setWarningMsg("")
            }, 1500)
            setWarningMsg('Can only contain letters or numbers')
        } else {
            const newUser = {
                name: signName,
                pass: signPass
            }
            socket.emit('signin', newUser)
            socket.on('sign-atempt', (exists) => {
                if (!exists) {
                    setSignName("")
                    setSignPass("")
                    setWarningModal(true)
                    setTimeout(() => {
                        setWarningModal(false)
                        setWarningMsg("")
                    }, 1500)
                    setWarningMsg('Sign in correcto 👍!')
                } else {
                    setWarningModal(true)
                    setTimeout(() => {
                        setWarningModal(false)
                        setWarningMsg("")
                    }, 1500)
                    setWarningMsg('Username already exist')
                }
            })
        }
    }

    return (
        <div className='logSignContainer' >
            {
                warningModal && <WarningModal warningMsg={warninbgMsg} />
            }

            <img className='logo' src={logo} alt="logo" title='Where is John Connor?' />
            <p></p>
            <div className='formsContainer'>
                {/* INICIO LOGIN */}
                <form className='logSingForms' onSubmit={(e) => {
                    e.preventDefault()
                    login()
                }
                } action=""
                >
                    <input
                        value={loginName}
                        required={true}
                        className='logSignInputs'
                        onChange={(e) => setLoginName(e.target.value)}
                        type="text"
                        placeholder='name' />
                    <input
                        value={loginPass}
                        required={true}
                        className='logSignInputs'
                        onChange={(e) => setLoginPass(e.target.value)}
                        type="password"
                        placeholder='password' />
                    <button className='logSignBtn'>Log in</button>
                </form>
                {/* INICIO SIGN IN */}
                <form className='logSingForms' onSubmit={(e) => {
                    e.preventDefault()
                    signUp()
                }} >
                    <input
                        required={true}
                        className='logSignInputs'
                        onChange={(e) => setSignName(e.target.value)}
                        value={signName}
                        type="text"
                        minLength={1}
                        placeholder='name' />
                    <input
                        value={signPass}
                        required={true}
                        className='logSignInputs'
                        onChange={(e) => setSignPass(e.target.value)}
                        type="password"
                        minLength={3}
                        placeholder='password' />
                    <button className='logSignBtn'>Sign in</button>
                </form>
            </div>
        </div>
    )
}