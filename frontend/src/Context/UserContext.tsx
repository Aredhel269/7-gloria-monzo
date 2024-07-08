import { createContext, useState, useEffect, ReactNode } from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface UserContextType {
  userName: string;
  userId: string;
  setUserName: (userName: string) => void;
  setUserId: (userId: string) => void;
  loadUserData: () => Promise<void>;
  updateUserData: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Carrega les dades de l'usuari de la base de dades quan es munta el component
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // Carrega les dades de l'usuari des de la base de dades
      const user = await prisma.user.findFirst({ where: { userId: userId } });
      if (user) {
        setUserName(user.userName);
        setUserId(user.userId);
      }
    } catch (error) {
      console.error("[UserContext] Error loading user data:", error);
    }
  };

  const updateUserData = async () => {
    try {
      // Actualitza les dades de l'usuari a la base de dades
      await prisma.user.update({
        where: { userId: userId },
        data: { userName: userName },
      });
    } catch (error) {
      console.error("[UserContext] Error updating user data:", error);
    }
  };

  const userContextValue: UserContextType = {
    userName,
    userId,
    setUserName,
    setUserId,
    loadUserData,
    updateUserData,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};
