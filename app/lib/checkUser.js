import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  try {
    const user = await currentUser();
    console.log("Current User:", user);

    if (!user) {
      console.log("No user found");
      return null;
    }

    const loggedInUser = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    if (loggedInUser) {
      console.log("Logged In User:", loggedInUser);
      return loggedInUser;
    }

    // Generate username from email or name
    const username = user.emailAddresses[0].emailAddress.split('@')[0];
    
    // Get user's full name from Clerk
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    const fullName = [firstName, lastName].filter(Boolean).join(" ");

    const newUser = await db.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        username: username,
        name: fullName || null, // Store the full name or null if empty
      },
    });

    console.log("New User Created:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error in checkUser:", error.message);
    return null;
  }
};