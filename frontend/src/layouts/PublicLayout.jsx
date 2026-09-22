import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/navbars/PublicNavbar";

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