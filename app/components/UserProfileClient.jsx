'use client';

import { useDbUser } from '../hooks/useDbUser';
import { useUsername } from '../hooks/useUsername';
import { useEffect, useState } from 'react';

export default function UserProfileClient() {
  const { dbUser, loading, error } = useDbUser();
  // Use our custom hook to ensure username stays in sync
  useUsername();
  
  if (loading) {
    return <div className="text-center p-4">Loading your profile...</div>;
  }
  
  if (error) {
    return <div className="text-red-500 p-4">Error loading profile: {error}</div>;
  }
  
  if (!dbUser) {
    return <div className="text-center p-4">No profile data found</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
      <div className="space-y-2">
        <p><span className="font-medium">Username:</span> {dbUser.username}</p>
        <p><span className="font-medium">Name:</span> {dbUser.name}</p>
        <p><span className="font-medium">Email:</span> {dbUser.email}</p>
      </div>
    </div>
  );
}
