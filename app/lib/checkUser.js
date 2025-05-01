import { db } from './prisma';
import { auth, currentUser } from '@clerk/nextjs/server';

export async function checkUser() {
  try {
    // Get the current authenticated user
    const user = await currentUser();
    
    // Return early if no user is authenticated
    if (!user) {
      return null;
    }

    // Look for existing user in database
    const existingUser = await db.user.findUnique({
      where: { clerkId: user.id },
    });

    // Return the existing user if found
    if (existingUser) {
      return existingUser;
    }

    // Create a new user if not found
    const newUser = await db.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress || '',
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        username: user.username || user.id,
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error in checkUser:", error);
    return null;
  }
}

// Alternative helper function that uses auth() instead
export async function getCurrentDbUser() {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return null;
    }
    
    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });
    
    return user;
  } catch (error) {
    console.error("Error getting current DB user:", error);
    return null;
  }
}