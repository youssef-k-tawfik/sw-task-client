import { Outlet } from "react-router-dom";
import { NavBar } from "@/components/ui";
import { useCart } from "./hooks";

export default function Layout() {
  const { setIsCartOpen } = useCart();
  return (
    <div onClick={() => setIsCartOpen(false)}>
      <NavBar />
      <main className="container pt-14">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
