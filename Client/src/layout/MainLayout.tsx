import { Outlet } from "react-router-dom";
import NavBar from "../components/ui/NavBar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header>
        <NavBar />
      </header>
      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>
      {/* Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
