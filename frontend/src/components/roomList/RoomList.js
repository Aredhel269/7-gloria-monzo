import { Link, useNavigate } from "react-router-dom"
import { socket } from "../../context/reducer"
import { useSelector } from "react-redux"
import './roomList.css'
import CreateRoomBtn from "../createRoomBtn/CreateRoomBtn"
import { useState } from "react"
import logo from '../../img/room_logo.png'
import binLogo from '../../img/bin_logo.png'
import home from '../../img/home.png'
import WarningModal from "../warningModal/WarningModal"
import { store } from "../../context/store"
import { logInOut } from "../../context/actions"
import axios from "axios"

export default function RoomList({ pathname }) {
    if (pathname !== '/') pathname = pathname.slice(1)
    const state = useSelector(state => state)
    const [creatingRoom, setCreatingRoom] = useState(false)
    const [warning, setWarning] = useState(false)
    const [warningMsg, setWarningMsg] = useState("")
    const navigate = useNavigate()

    const deleteRoom = (room) => {
        const roomToDelete = state.rooms.find(room_two => room_two.name === room.name)
        if (roomToDelete.users.length !== 0) {
            setWarningMsg('❌ hay usuarios en la sala')
            setWarning(true)
            setTimeout(() => {
                setWarningMsg('')
                setWarning(false)
            }, 1500)
        } else if (roomToDelete.users.length === 0) {
            socket.emit('delete-room', room)
        }
    }

    const joinRoom = async (room) => {
        const webToken = localStorage.getItem('token')
        if (!webToken) store.dispatch(logInOut(false))
        const isTokenOk = await axios.get('/api/autentication', {
            headers: { 'Authorization': webToken }
        }).then((res) => res = res.data.name)
        if (isTokenOk === state.userName) {
            socket.emit('join-room', room, pathname, state.userName)
            socket.emit('user-joined-room-message', `/${room.name}`, state.userName)
        } else {
            console.log('entra en false')
            store.dispatch(logInOut(false))
            navigate('/')
        }
    }

    return <ul className='roomUl'>
        <li
            className="roomLi">
            {
                creatingRoom ? <CreateRoomBtn setWarning={setWarning} setWarningMsg={setWarningMsg} creatingRoom={creatingRoom} setCreatingRoom={setCreatingRoom}
                    onMouseLeave={() => setCreatingRoom(false)} />
                    :
                    <button
                        onMouseOver={() => setCreatingRoom(true)}
                        className='createRoomBtn'
                    >Crear Sala ➕</button>
            }
        </li>
        {
            warning && <WarningModal warningMsg={warningMsg} />
        }
        {state.rooms.length > 0 && state.rooms.map((room, index) => {
            if (index !== 0) {
                return (
                    <li className="roomLi" key={index} >
                        <Link className="roomLink" to={`/${room.name}`} onClick={() => joinRoom(room)} >
                            <div className="imgPContainer">
                                <img className="roomLogo" src={logo} alt="" />
                                <p>{room.name}</p>
                            </div>
                        </Link>
                        {
                            room.owner === state.userName ? <button className="deleteBtn" to={'/'} onClick={() => deleteRoom(room)} ><img className="binLogo" src={binLogo} alt="" /></button > : ""
                        }
                    </li>
                )
            }

            return <li key={index} className="roomLi">
                <Link onClick={() => joinRoom({ name: 'sala principal' })}
                    className='homeBtn' to='/'>
                    <img className='homeImg' src={home} alt="" />
                    Sala principal
                </Link>
            </li>

        })}
    </ul>
}