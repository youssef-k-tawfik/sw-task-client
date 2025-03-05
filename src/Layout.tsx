import { Outlet } from "react-router-dom";
import { NavBar, Footer } from "@/components/ui";

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
