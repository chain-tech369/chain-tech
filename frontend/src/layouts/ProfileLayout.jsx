import { Outlet, useLoaderData } from "react-router-dom";

import ProfileSide from "../components/sidebars/ProfileSidebar";

export default function ProfileLayout() {
  // Get the data returned by currentUserLoader
  const currentUser = useLoaderData();

  return (
    <div className="min-h-screen bg-slate-50">

      {/* PROFILE SIDEBAR */}
      <ProfileSide currentUser={currentUser} />

      {/* MAIN CONTENT */}
      <main className="min-h-screen lg:ml-72">
        <Outlet />
      </main>

    </div>
  );
}