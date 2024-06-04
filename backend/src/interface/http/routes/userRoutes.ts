import { FastifyInstance } from 'fastify';
import UserController from '../../controllers/userController';

const registerRoutes = (app: FastifyInstance) => {
  app.post('/register', UserController.registerUser); 
  app.post('/login', UserController.loginUser);
  app.get('/users/:userName', UserController.getUserByUserName);
  app.get('/users', UserController.getAllUsers);
};

export default registerRoutes;
