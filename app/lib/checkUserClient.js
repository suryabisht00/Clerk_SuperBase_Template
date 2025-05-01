'use client';

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export function useDbUser() {
  const { user } = useUser();
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      if (!user) {
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
          console.error("Failed to fetch user from database");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [user]);

  return { dbUser, loading };
}
