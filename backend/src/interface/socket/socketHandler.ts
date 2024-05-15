import { Server } from 'socket.io';
import { UserService } from '../../domain/services/userService';
import { RoomService } from '../../domain/services/roomService';
import { MessageService } from '../../domain/services/messageService';
import { Socket } from 'socket.io';

export class SocketHandler {
  private userService: UserService;
  private roomService: RoomService;
  private messageService: MessageService;

  constructor(
    userService: UserService,
    roomService: RoomService,
    messageService: MessageService
  ) {
    this.userService = userService;
    this.roomService = roomService;
    this.messageService = messageService;
  }

  public handleSocketConnection(socket: Socket) {
    socket.on('join-room', async (roomId: number) => {
      try {
        // Obtenir informació de l'usuari associat al socket
        const userId = socket.userId; // Assumint que tenim una manera de recuperar la identitat de l'usuari des del socket
        
        // Comprovar si l'usuari està autoritzat per unir-se a la sala
        const user = await this.userService.getUserById(userId);
        if (!user) {
          socket.emit('error', 'Usuari no autoritzat');
          return;
        }

        // Comprovar si la sala existeix
        const room = await this.roomService.getRoomById(roomId);
        if (!room) {
          socket.emit('error', 'Sala no trobada');
          return;
        }

        // Afegir l'usuari a la sala
        await this.roomService.addUserToRoom(userId, roomId);

        // Notificar als altres usuaris de la sala que un nou usuari s'ha unit
        socket.to(roomId.toString()).emit('user-joined', { userId, roomId });

        // Notificar a l'usuari que s'ha unit amb èxit a la sala
        socket.emit('joined-room', roomId);
      } catch (error) {
        console.error('Error en unir-se a la sala:', error);
        socket.emit('error', 'Error en unir-se a la sala');
      }
    });

    socket.on('leave-room', async (roomId: number) => {
      try {
        // Obtenir informació de l'usuari associat al socket
        const userId = socket.userId; // Assumint que tenim una manera de recuperar la identitat de l'usuari des del socket
        
        // Comprovar si l'usuari està autoritzat per sortir de la sala
        const user = await this.userService.getUserById(userId);
        if (!user) {
          socket.emit('error', 'Usuari no autoritzat');
          return;
        }

        // Comprovar si l'usuari és a la sala
        const userInRoom = await this.roomService.isUserInRoom(userId, roomId);
        if (!userInRoom) {
          socket.emit('error', 'Lusuari no és a la sala');
          return;
        }

        // Treure l'usuari de la sala
        await this.roomService.removeUserFromRoom(userId, roomId);

        // Notificar als altres usuaris de la sala que un usuari ha sortit
        socket.to(roomId.toString()).emit('user-left', { userId, roomId });

        // Notificar a l'usuari que ha sortit amb èxit de la sala
        socket.emit('left-room', roomId);
      } catch (error) {
        console.error('Error en sortir de la sala:', error);
        socket.emit('error', 'Error en sortir de la sala');
      }
    });

    socket.on('new-message', async (roomId: number, message: string) => {
      try {
        // Obtenir informació de l'usuari associat al socket
        const userId = socket.userId; // Assumint que tenim una manera de recuperar la identitat de l'usuari des del socket
        
        // Comprovar si l'usuari està autoritzat per enviar missatges a la sala
        const user = await this.userService.getUserById(userId);
        if (!user) {
          socket.emit('error', 'Usuari no autoritzat');
          return;
        }

        // Comprovar si l'usuari és a la sala
        const userInRoom = await this.roomService.isUserInRoom(userId, roomId);
        if (!userInRoom) {
          socket.emit('error', 'Lusuari no és a la sala');
          return;
        }

        // Crear el missatge
        const newMessage = await this.messageService.createMessage(userId, roomId, message);

        // Notificar a tots els usuaris de la sala sobre el nou missatge
        socket.to(roomId.toString()).emit('message', newMessage);
      } catch (error) {
        console.error('Error en enviar el missatge:', error);
        socket.emit('error', 'Error en enviar el missatge');
      }
    });
  }
}