import { UserProfile } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import UserProfileClient from "../../../components/UserProfileClient";

const Profile = async () => {
  const { userId } = await auth();
  const isAuth = !!userId;
  const user = await currentUser();

  if (!isAuth) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <h1 className="text-2xl mb-6">Hello, {user?.username || user?.firstName || 'User'}</h1>
      
      {/* Client component will fetch and show DB user data with proper username */}
      <div className="mb-8 w-full max-w-md">
        <UserProfileClient />
      </div>
      
      {/* Clerk's built-in profile UI */}
      <div className="w-full max-w-md">
        <UserProfile />
      </div>
    </div>
  );
};

export default Profile;