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
        console.log("registerUser called with", { userName, password });
        try {
            const user = await userService.createUser(userName, password);
            console.log("User created:", user);
            res.status(201).json(user);
        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).json({ error: "Error registering user" });
        }
    }

    async loginUser(req: Request, res: Response) {
        const { userName, password } = req.body;
        console.log("loginUser called with", { userName, password });
        try {
            const user = await userService.login(userName, password);
            if (user) {
                const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
                console.log("Login successful:", { user, token });
                res.status(200).json({ user, token });
            } else {
                console.log("Login failed: incorrect credentials");
                res.status(401).json({ error: "Incorrect credentials" });
            }
        } catch (error) {
            console.error("Error logging in:", error);
            res.status(500).json({ error: "Error logging in" });
        }
    }

    authGoogle(req: Request, res: Response) {
        passport.authenticate("google", { scope: ["profile", "email"] })(req, res);
    }

    googleCallback(req: Request, res: Response) {
        passport.authenticate("google", { failureRedirect: "/login" }, (err: Error, user: User) => {
            if (err || !user) {
                console.error("Google auth failed:", err);
                return res.redirect("/login");
            }
            const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
            res.redirect(`/?token=${token}`);
        })(req, res);
    }
}

export default new UserController();
