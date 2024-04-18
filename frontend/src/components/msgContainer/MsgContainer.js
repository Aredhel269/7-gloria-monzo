import { useState } from 'react'
import { socket } from '../../context/reducer'
import { useSelector } from 'react-redux'
import SendMsgBox from '../sendMsgBox/SendMsgBox'
import './msgContainer.css'
import { logInOut } from '../../context/actions'
import { store } from '../../context/store'
import logOutImg from '../../img/exit.png'

export default function MsgContainer({ pathname }) {
    const [welcomeModal, setWelcomeModal] = useState(false)
    const [welcomeMessage, setWelcomeMessage] = useState("")
    const userName = useSelector(state => state.userName)
    let path = pathname
    if (pathname !== '/') path = pathname.slice(1)
    const state = useSelector(state => state.rooms.find((room) => {
        return room.name === path
    }))

    const handleUserJoinedMessage = (location) => {
        if (location === '/sala principal') location = '/'
        const ok = location === pathname ? true : false
        return ok
    }

    socket.on('user-joined-room-message', (location, message) => {
        const ok = handleUserJoinedMessage(location)
        if (ok === true) {
            setWelcomeModal(true)
            setWelcomeMessage(message)
            setTimeout(() => {
                setWelcomeMessage("")
                setWelcomeModal(false)
            }, 3000)
        } else {
            setWelcomeModal(false)
        }
    })

    const logOut = () => {
        store.dispatch(logInOut(false))
    }

    return <div className="msgContainer">
        <div className='topBoxContainer'>
            <div className='topBox' >
                <div className='titleContainer' >
                    <p className='preTitle'>Estas en:</p>
                    <p className='roomTitle'>{pathname === '/' ?
                        'Sala principal'
                        : `${pathname.slice(1)}`}</p>
                </div>
                <button className='logoutBtn' onClick={() => logOut()}> <img className='logoutImg' alt='button' src={logOutImg} /> </button>
            </div>
        </div>

        <ul className='msgUl'>
            {state.messages && state.messages.reverse().map((msg, index) => {
                return <li key={index} className={msg.owner === userName ? 'msgLi myMsg' : 'msgLi theirMsg'} >
                    <p className='msgOwner' >{msg.owner}</p>
                    <p className='msgText'>{msg.text}</p>
                </li>

            })}
        </ul>
        {
            welcomeModal && <div className='welcomeModalContainer'>
                <p className='welcomeModalMessage'>{welcomeMessage}</p>
            </div>
        }
        <SendMsgBox pathname={pathname} />
    </div >
}