import './sendMsgBox.css'
import { useState } from 'react'
import { socket } from '../../context/reducer'
import paperLogo from '../../img/sendBtn.png'
import { useSelector } from 'react-redux'

export default function SendMsgBox({ pathname }) {
    const [msg, setMsg] = useState("")
    const state = useSelector(state => state.userName)
    let path = pathname
    if (pathname !== '/') path = pathname.slice(1)

    const sendMsg = (msg) => {
        if (!msg.replace(/\s/g, '').length) {
        } else {
            const newMessage = {
                text: msg,
                owner: state,
                room: path
            }
            socket.emit('send-msg', newMessage)
            setMsg('')
        }
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                sendMsg(msg)
            }}
            className="sendMsgForm" action="">
            <input onChange={e => setMsg(e.target.value)} className="msgInput" type="text" value={msg} required={true} minLength={1} />
            <button className="sendMsgBtn" ><img className='sendBtnImg' src={paperLogo} alt="" /></button>
        </form>
    )
}