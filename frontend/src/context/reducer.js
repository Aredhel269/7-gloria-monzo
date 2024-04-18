import io from 'socket.io-client'

export const socket = io('http://localhost:4040/')
export const stateReducer = (state = {
    rooms: [{}],
    logedIn: (false),
    userName: ""
}, action) => {

    switch (action.type) {
        case '@logInOut':
            return {
                ...state,
                logedIn: action.payload,
            }
        case '@userName':
            return {
                ...state,
                userName: action.payload
            }
        case '@updateRooms':
            return {
                ...state, rooms: action.payload
            }
        case '@updateMessages':
            return {
                ...state, messages: action.payload
            }
        case '@updateNewUser':
            return {
                ...state,
                rooms: action.payload.rooms,
                messages: action.payload.messages
            }
        default:
            return state
    }
}
