import { Outlet } from "react-router-dom";
import { NavBar } from "./components/ui/NavBar";
import { Footer } from "./components/ui/Footer";

export default function Layout() {
  return (
    <>
      <NavBar />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
