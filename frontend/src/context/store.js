import { stateReducer } from "./reducer"
import { socket } from "./reducer"
import { updateMessages, updateNewUser, updateRooms } from "./actions"
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: stateReducer,
  devTools: process.env.NODE_ENV !== 'production', // Habilita Redux DevTools només en entorns de desenvolupament
});

socket.on('update-messages', (messages) => {
    store.dispatch(updateMessages(messages))
})

socket.on('update-rooms', async (rooms) => {
    await store.dispatch(updateRooms(rooms))
})

socket.on('update-new-user', (data) => {
    store.dispatch(updateNewUser(data))
})