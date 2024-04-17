import React from 'react'
import RoomList from '../roomList/RoomList'
import './main.css'
import MsgContainer from '../msgContainer/MsgContainer'

export default function Main({ pathname }) {
    return (
        <div className='mainContainer' >
            <RoomList pathname={pathname} />
            <div className='centerComponentsContainer'>
                <MsgContainer pathname={pathname} />
            </div>
        </div >
    )
}