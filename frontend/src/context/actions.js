
export const logInOut = (inOrOut) => {
  return {
      type: '@logInOut',
      payload: inOrOut
  }
}

export const userName = (name) => {
  return {
      type: '@userName',
      payload: name
  }
}

export const updateMessages = (messages) => {
  return {
      type: '@updateMessages',
      payload: messages
  }
}


export const updateRooms = (rooms) => {
  return {
      type: '@updateRooms',
      payload: rooms
  }
}

export const updateNewUser = (data) => {
  return {
      type: '@updateNewUser',
      payload: {
          rooms: data.rooms,
          messages: data.messages
      }
  }
}


