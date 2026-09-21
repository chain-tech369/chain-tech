import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/fix-layouts/PublicNavbar";

export default function PublicLayout() {
  return (
    <>
      <PublicNavbar />

      <main>
        <Outlet />
      </main>
    </>
  );
}