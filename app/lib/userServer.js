import { db } from './prisma';
import { auth, currentUser } from '@clerk/nextjs/server';

/**
 * Gets a proper username from Clerk user data
 * @param {Object} clerkUser - Clerk user object
 * @returns {string} A username
 */
function getProperUsername(clerkUser) {
  // First try to use the username from Clerk if available
  if (clerkUser.username) {
    return clerkUser.username;
  }
  
  // Second option: use first name + last initial if available
  if (clerkUser.firstName) {
    const lastInitial = clerkUser.lastName ? clerkUser.lastName.charAt(0).toLowerCase() : '';
    return `${clerkUser.firstName.toLowerCase()}${lastInitial}`;
  }
  
  // Third option: use email prefix if available
  const email = clerkUser.emailAddresses?.[0]?.emailAddress;
  if (email) {
    const emailPrefix = email.split('@')[0];
    return emailPrefix.toLowerCase().replace(/[^a-z0-9]/g, '_');
  }
  
  // Last resort: use clerk ID with a readable prefix
  return `user_${clerkUser.id.substring(0, 8)}`;
}

/**
 * Get or create a user in the database based on Clerk authentication
 */
export async function getOrCreateDbUser() {
  try {
    const { userId } = await auth();
    if (!userId) return null;
    
    // Try to find existing user by ClerkID
    let user = await db.user.findUnique({
      where: { clerkId: userId },
    });
    
    if (user) return user;
    
    // Get Clerk user data
    const clerkUser = await currentUser();
    if (!clerkUser) return null;
    
    const email = clerkUser.emailAddresses?.[0]?.emailAddress;
    const username = getProperUsername(clerkUser);
    
    if (email) {
      // Check if user exists with this email
      const existingUser = await db.user.findUnique({
        where: { email },
      });
      
      if (existingUser) {
        // Update existing user with Clerk ID and better username if needed
        return await db.user.update({
          where: { id: existingUser.id },
          data: {
            clerkId: userId,
            // Only update username if it was using the generic pattern
            ...(existingUser.username.startsWith('user_') ? { username } : {})
          },
        });
      }
    }
    
    // Create a new user
    return await db.user.create({
      data: {
        clerkId: userId,
        username: username,
        name: clerkUser.firstName 
          ? `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim()
          : 'New User',
        email: email || `${username}@placeholder.com`,
      },
    });
    
  } catch (error) {
    console.error("Error in getOrCreateDbUser:", error);
    return null;
  }
}

/**
 * Update a user's username based on their Clerk profile
 */
export async function updateUserUsername(userId) {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser || !userId) return null;
    
    const username = getProperUsername(clerkUser);
    
    return await db.user.update({
      where: { clerkId: userId },
      data: { username }
    });
  } catch (error) {
    console.error("Error updating username:", error);
    return null;
  }
}
