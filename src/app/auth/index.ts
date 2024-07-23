"use server"
// Auth
import { auth, currentUser } from "@clerk/nextjs/server"

export const getCurrentUser = async () => {
    const user = await currentUser();
    return user;
}

export const getUserId = async () => {
    const { userId } = auth()
    return userId
}
