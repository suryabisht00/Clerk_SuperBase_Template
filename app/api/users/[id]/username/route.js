import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { db } from '@/app/lib/prisma';

export async function PUT(request, { params }) {
  try {
    // Await the params object before destructuring
    const { id } = await params;
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get the current user
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Get proper username
    let username = clerkUser.username;
    
    if (!username && clerkUser.firstName) {
      const lastInitial = clerkUser.lastName ? clerkUser.lastName.charAt(0).toLowerCase() : '';
      username = `${clerkUser.firstName.toLowerCase()}${lastInitial}`;
    } else if (!username && clerkUser.emailAddresses?.length > 0) {
      const email = clerkUser.emailAddresses[0].emailAddress;
      username = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '_');
    } else if (!username) {
      username = `user_${clerkUser.id.substring(0, 8)}`;
    }
    
    // Update the user
    const updatedUser = await db.user.update({
      where: { id },
      data: { username }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Username updated successfully',
      data: updatedUser
    });
  } catch (error) {
    console.error('Error updating username:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update username', error: error.message },
      { status: 500 }
    );
  }
}
