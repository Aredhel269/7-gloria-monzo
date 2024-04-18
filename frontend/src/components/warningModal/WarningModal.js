import React from 'react'
import './warningmodal.css'

export default function WarningModal({ warningMsg }) {
    return (
        < div className='warningContainer' >
            <p>{warningMsg}</p>
        </div >

    )
}