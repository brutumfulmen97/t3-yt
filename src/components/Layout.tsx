import { FC, useState } from "react";
import { Navbar, Sidebar } from "./Components";
import Menu from "./icons/Menu";

interface LayoutProps {
  children: JSX.Element;
  closeSidebar?: boolean;
}

const Layout: FC<LayoutProps> = ({ children, closeSidebar }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <Navbar>
        <button
          type="button"
          className="-mx-2 inline-flex items-center justify-center rounded-md p-2 focus:outline-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </Navbar>
      <Sidebar
        isOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        closeSidebar={closeSidebar}
      ></Sidebar>
      <div className="space-x-4">{children}</div>
    </>
  );
};

export default Layout;
