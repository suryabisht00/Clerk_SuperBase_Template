import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { getOrCreateDbUser } from '../lib/userServer';

// This is a Server Component
async function Navbar() {
  // Use our new server utility to get/create the user
  const user = await getOrCreateDbUser();
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold">
                Rapid8
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Home
              </Link>
              {/* Add more navigation links as needed */}
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <>
                <span className="mr-4">Welcome, {user.username || user.name || 'User'}</span>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <Link href="/sign-in" className="text-gray-900 hover:text-gray-700">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;