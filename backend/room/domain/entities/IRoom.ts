export type TMessage = {
    text: string,
    owner: string,
    room: string,
}

export interface Room {
    name: string,
    owner: string,
    pass: string,
    users: string[],
    messages: TMessage[]
}