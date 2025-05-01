import { UserService } from '@/app/services/user.service';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    // Await the params object before destructuring
    const { clerkId } = await params;
    const user = await UserService.getUserByClerkId(clerkId);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error('Error fetching user by clerk ID:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch user', error: error.message },
      { status: 500 }
    );
  }
}
