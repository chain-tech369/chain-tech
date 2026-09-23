import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/navbars/PublicNavbar";
import Footer from "../components/footers/Footer";

export default function PublicLayout() {
  return (
    <>
      <PublicNavbar />

      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}