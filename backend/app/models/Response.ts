export class Response {
  status = true
  message = []
  payload = null
  error = []
  messages: any

  setStatus (status) {
    if (typeof (status) === 'boolean') { this.status = status }
  }

  addMessage(message: string) {
    this.messages.push(message)
  }

  addError(error: any) {
    this.error = error
  }

  setError (error) {
    this.error = error
  }

  setPayload (payload) {
    this.payload = payload
  }
}
