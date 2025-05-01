'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useDbUser } from './useDbUser';

/**
 * Hook to ensure username is properly synchronized with Clerk
 */
export function useUsername() {
  const { user: clerkUser, isLoaded: clerkLoaded } = useUser();
  const { dbUser, loading: dbLoading, error } = useDbUser();
  
  useEffect(() => {
    // Skip if data isn't loaded yet or there's an error
    if (!clerkLoaded || dbLoading || error || !dbUser || !clerkUser) {
      return;
    }
    
    // Check if username updates are needed
    const shouldUpdateUsername = 
      // Username starts with generic pattern
      (dbUser.username.startsWith('user_') &&
      // And clerk has better data available
      (clerkUser.username || clerkUser.firstName || 
       clerkUser.emailAddresses?.[0]?.emailAddress));
    
    if (shouldUpdateUsername) {
      // Call API to update username
      fetch(`/api/users/${dbUser.id}/username`, {
        method: 'PUT',
      }).catch(err => {
        console.error('Failed to update username:', err);
      });
    }
  }, [clerkLoaded, dbLoading, clerkUser, dbUser, error]);
  
  return { username: dbUser?.username || clerkUser?.username || null };
}
