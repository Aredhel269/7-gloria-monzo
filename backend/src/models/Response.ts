export class Response {
  status = true
  message = []
  payload = null
  error: Error[] = []
  messages: string[] = [] // Inicialitza com a un array buit

  setStatus(status: boolean) {
    if (typeof status === 'boolean') {
      this.status = status
    }
  }

  addMessage(message: string) {
    this.messages.push(message) // Afegir el missatge a l'array messages
  }

  addError(error: any) {
    this.error.push(error) // Afegir l'error a l'array error
  }

  setError(error: any) {
    this.error.push(error) // Afegir l'error a l'array error
  }

  setPayload(payload: any) {
    this.payload = payload
  }
}
