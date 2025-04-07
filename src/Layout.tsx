import { Outlet } from "react-router-dom";
import { NavBar } from "@/components/ui";

export default function Layout() {
  return (
    <>
      <NavBar />
      <main className="container pt-14">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
}
