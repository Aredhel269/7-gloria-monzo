import { Request, Response } from "express";
import { UserServiceImpl } from "../../application/userServiceImpl";
import { UserRepositoryImpl } from "../../infraestructure/database/userRepositoryImpl";
import jwt from "jsonwebtoken";
import passport from "passport";
import { User } from "../../domain/entities/user";

const userRepository = new UserRepositoryImpl();
const userService = new UserServiceImpl(userRepository);

class UserController {
    async registerUser(req: Request, res: Response) {
        const { userName, password } = req.body;
        try {
            const user = await userService.createUser(userName, password);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: "Error en registrar l'usuari" });
        }
    }

    async loginUser(req: Request, res: Response) {
        const { userName, password } = req.body;
        try {
            const user = await userService.login(userName, password);
            if (user) {
                const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
                res.status(200).json({ user, token });
            } else {
                res.status(401).json({ error: "Credencials incorrectes" });
            }
        } catch (error) {
            res.status(500).json({ error: "Error en iniciar sessió" });
        }
    }

    authGoogle(req: Request, res: Response) {
        passport.authenticate("google", { scope: ["profile", "email"] })(req, res);
    }

    googleCallback(req: Request, res: Response) {
        passport.authenticate("google", { failureRedirect: "/login" }, (err: Error, user: User) => {
            if (err || !user) {
                return res.redirect("/login");
            }
            const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
            res.redirect(`/?token=${token}`);
        })(req, res);
    }
}

export default new UserController();
