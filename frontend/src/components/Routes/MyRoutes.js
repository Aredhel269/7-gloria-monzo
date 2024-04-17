import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Main from '../main/Main'
import LoginSignin from '../loginSignin/LoginSignin'

export default function MyRoutes() {
    const state = useSelector(state => state)
    return (

        < Routes >
            {
                state.logedIn && <>
                    <Route exact path={`/`} element={<Main pathname={`/`} />} />
                    {
                        state.rooms.length > 0 && state.rooms.map((room, index) => {
                            return <Route
                                key={index}
                                exact path={`/${room.name}`}
                                element={state.logedIn ? <Main pathname={`/${room.name}`} /> : <Navigate to='/' pathname={'/'} />}
                            />
                        })
                    }
                </>
            }

            {!state.logedIn && <Route exact path={`/`} element={< LoginSignin pathname={`/`} />} />}
        </Routes >



    )
}