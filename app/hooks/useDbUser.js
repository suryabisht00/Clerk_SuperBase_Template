'use client';

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

/**
 * Client-side hook to fetch the database user based on the authenticated Clerk user
 */
export function useDbUser() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      if (!isLoaded || !isSignedIn || !user?.id) {
        setLoading(false);
        return;
      }

      try {
        // Fetch the user from your database using the clerk ID
        const response = await fetch(`/api/users/clerk/${user.id}`);
        
        if (response.ok) {
          const data = await response.json();
          setDbUser(data.data);
        } else {
          setError("Failed to fetch user from database");
          console.error("Failed to fetch user from database");
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [user?.id, isLoaded, isSignedIn]);

  return { dbUser, loading, error, isSignedIn };
}
