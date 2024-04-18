import React, { useState } from 'react'
import './creteRoomBtn.css'
import { socket } from '../../context/reducer'
import { useSelector } from 'react-redux'

export default function CreateRoomBtn({ setCreatingRoom, setWarning, setWarningMsg }) {
    const [roomName, setRoomName] = useState("")
    const [roomPass, setRoomPass] = useState("")
    const state = useSelector(state => state)

    const createRoom = () => {
        function onlyLettersAndNumbers(str) {
            return /^[A-Za-z0-9][/^\S*$/]*$/.test(str);
        }
        const okName = onlyLettersAndNumbers(roomName)
        if (!okName) {
            setWarning(true)
            setTimeout(() => {
                setWarning(false)
                setWarningMsg("")
            }, 1500)
            setWarningMsg('❌ Solo puede contener letras o números')
        } else {
            socket.on(`${roomName}-exists`, (isTrue) => {
                isTrue && setWarning(true)
                setWarningMsg(`❌ El nombre ya existe `)
                setTimeout(() => {
                    setWarning(false)
                }, 1500)
            })
            socket.emit('create-room', {
                name: roomName,
                pass: roomPass,
                owner: state.userName
            })
            setRoomName("")
            setRoomPass("")
        }
    }

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    createRoom()
                }}
                onMouseLeave={() => setCreatingRoom(false)} className="createRoomForm">
                <input
                    className='createRoomInput'
                    required={true} maxLength="9"
                    onChange={e => setRoomName(e.target.value)}
                    value={roomName} type="text"
                    placeholder="nombre" />
                <button className='creatingRoomBtn'>➕</button>
            </form>
        </>
    )
}